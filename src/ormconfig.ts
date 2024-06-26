import { DataSource } from 'typeorm';
import Email from './entities/Email';

export const ormconfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Email],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  logging: false,
});
