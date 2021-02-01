module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL ||
    "postgresql://postgres@localhost/swatch-ui",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://swatch-ui.vercel.app/'
}