import { Connection, createConnection } from 'typeorm';

export const getConnection = async (): Promise<Connection> =>
  createConnection();
