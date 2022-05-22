module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null,
  username: process.env.DB_USERNAME || 'newsletter',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'newsletter',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  subscribers: [__dirname + '/src/**/*.subscriber{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  cli: {
    entitiesDir: 'src/modules',
    migrationsDir: 'migrations',
  },
  // Timezone configured on the MySQL server.
  // This is used to typecast server date/time values to JavaScript Date object and vice versa.
  timezone: 'Z',
  synchronize: false,
  debug: process.env.NODE_ENV === 'development',
};
