import { Sequelize } from 'sequelize-typescript';
import { config } from './config/config';

const { username, password, database, host } = config;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  username,
  password,
  database,
  host,
  dialect: 'postgres',
  storage: ':memory:'
});
