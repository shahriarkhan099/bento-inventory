import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT ?? 4000,
  // DB_URI: process.env.DB_URI ?? 'postgres://postgres:st123@localhost:5432/inventorydb'
  DB_URI: process.env.DB_URI ?? 'postgres://koyeb-adm:6XiHJZp4Pwnr@ep-green-snowflake-77705458.eu-central-1.aws.neon.tech/koyebdb',
  // DB_SSL: process.env.DB_SSL === 'true'
}

export default config;