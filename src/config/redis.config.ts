export default (): any => ({
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  },
});
