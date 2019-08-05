export const config = {
  username: process.env.UG_POSTGRESS_USERNAME,
  password: process.env.UG_POSTGRESS_PASSWORD,
  database: process.env.UG_POSTGRESS_DATABASE,
  host: process.env.UG_POSTGRESS_HOST,
  dialect: 'postgres',
  aws: {
    aws_reigion: process.env.UG_AWS_REGION,
    aws_profile: process.env.UG_AWS_PROFILE,
    aws_media_bucket: process.env.UG_AWS_MEDIA_BUCKET
  },
  allowedOrigins: [
    'http://localhost:8100',
    'http://udagram-krasserp-front-end.s3-website-eu-west-1.amazonaws.com'
  ],

  url_expires: 60 * 5,
  jwt: {
    secret: process.env.UG_JWT_SECRET
  }
};
