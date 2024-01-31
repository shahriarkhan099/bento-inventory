import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT ?? 4000,
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
  DB_URI: process.env.DB_URI ?? 'postgres://postgres:st123@localhost:5432/inventorydb',
  SKELETON_URL: process.env.SKELETON_URL ?? 'https://sak-skeleton-samiya-kazi.koyeb.app',
  HELPER_API: process.env.HELPER_API ?? ''
}

export default config;