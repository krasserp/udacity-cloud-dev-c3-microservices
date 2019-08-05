export const config = {
  dev: {
    username: process.env.UG_POSTGRESS_USERNAME,
    password: process.env.UG_POSTGRESS_PASSWORD,
    database: process.env.UG_POSTGRESS_DBATABASE,
    host: process.env.POSTGRESS_HOST,
    dialect: 'postgres',
    aws_reigion: process.env.UG_AWS_REGION,
    aws_profile: process.env.UG_AWS_PROFILE,
    aws_media_bucket: process.env.UG_AWS_BUCKET
  },
  prod: {
    username: '',
    password: '',
    database: 'udagram_prod',
    host: '',
    dialect: 'postgres'
  },
  jwt: {
    secret: process.env.UG_JWT_SECRET
  }
};
