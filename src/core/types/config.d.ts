declare type DbConfig = {
  PORT: number;
  USER: string;
  DIALECT: string;
  PASS: string;
  NAME: string;
  HOST: string;
};

declare type ConfigType = {
  PORT: number;
  DB: DbConfig;
};
