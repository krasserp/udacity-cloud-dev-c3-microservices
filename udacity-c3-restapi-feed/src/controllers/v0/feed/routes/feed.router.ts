import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
import { isEmpty } from '../../../../helpers/commons';
import { config } from '../../../../config/config';

const HttpStatus = require('http-status-codes');

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  //   return next();
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: 'No authorization headers.' });
  }

  const token_bearer = req.headers.authorization.split(' ');
  if (token_bearer.length != 2) {
    return res.status(401).send({ message: 'Malformed token.' });
  }

  const token = token_bearer[1];
  return jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate.' });
    }
    return next();
  });
}

interface parameterObject {
  caption?: string;
  url?: string;
  [key: string]: string;
}

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
  const items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });
  items.rows.map(item => {
    if (item.url) {
      item.url = AWS.getGetSignedUrl(item.url);
    }
  });
  res.send(items);
});

// Get a specific resource
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await FeedItem.findByPk(id);
  res.send(item);
});

// update a specific resource
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { caption, url } = req.body;
  const updateOptions: parameterObject = { caption, url };
  const updateKeys = Object.keys(updateOptions);
  const updateObj: parameterObject = {};

  updateKeys.forEach(k => {
    if (updateOptions[k]) {
      updateObj[k] = updateOptions[k];
    }
  });
  if (isEmpty(updateObj)) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ erro: 'no caption and no url provided' });
  } else {
    const item = await FeedItem.update(updateObj, {
      where: { id },
      returning: true
    });
    res.status(HttpStatus.OK).json(item);
  }
  //res.send(HttpStatus.INTERNAL_SERVER_ERROR).send('not implemented');
});

// Get a signed url to put a new item in the bucket
router.get(
  '/signed-url/:fileName',
  requireAuth,
  async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({ url: url });
  }
);

// Post meta data and the filename after a file is uploaded
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const caption = req.body.caption;
  const fileName = req.body.url;

  // check Caption is valid
  if (!caption) {
    return res
      .status(400)
      .send({ message: 'Caption is required or malformed' });
  }

  // check Filename is valid
  if (!fileName) {
    return res.status(400).send({ message: 'File url is required' });
  }

  const item = await new FeedItem({
    caption: caption,
    url: fileName
  });

  const saved_item = await item.save();

  saved_item.url = AWS.getGetSignedUrl(saved_item.url);
  res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;
