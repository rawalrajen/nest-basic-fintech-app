export default (): any => ({
  database: {
    connection: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    name: process.env.DB_DATABASE || 'newsletter',
    username: process.env.DB_USERNAME || 'newsletter',
    password: process.env.DB_PASSWORD || 'newsletter@123',
    database: process.env.DB_DATABASE || 'newsletter',
  },
});
