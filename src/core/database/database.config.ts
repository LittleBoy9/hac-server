import configData from '@constants/config';
import { Injectable } from '@nestjs/common';
import { SequelizeOptionsFactory } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
@Injectable()
export class DatabaseConfig implements SequelizeOptionsFactory {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging: any;
  dialectOptions: Record<string, any>;
  constructor() {
    this.username = configData.DB.USER as string;
    this.password = configData.DB.PASS as string;
    this.database = configData.DB.NAME as string;
    this.host = configData.DB.HOST as string;
    this.port = configData.DB.PORT;
    this.dialect = configData.DB.DIALECT as string;
    this.logging = console.log;
    this.dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    };
  }
  createSequelizeOptions() {
    return {
      username: this.username,
      password: this.password,
      database: this.database,
      host: this.host,
      port: this.port,
      dialect: this.dialect as Dialect,
      // sync: { force: true },
      // logging: console.log,
      logging: false,
      dialectOptions: this.dialectOptions,
      autoLoadModels: true,
    };
  }
}
