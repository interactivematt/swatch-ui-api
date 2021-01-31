module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:8000/api",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
}