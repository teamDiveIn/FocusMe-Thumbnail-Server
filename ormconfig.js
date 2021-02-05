const path = require('path')

const { DATABASE_HOST, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD } = process.env

const config = {
  type: 'mysql',
  host: DATABASE_HOST,
  port: 3306,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: [path.resolve(__dirname, 'dist', '**/*.entity{.ts,.js}')],
  logging: ['error'],
  maxQueryExecutionTime: 1000,
  timezone: '+09:00',
  charset: 'utf8mb4_unicode_ci',
  migrations: [path.resolve(__dirname, 'dist', 'migrations', '*.js')],
  extra: {
    connectionLimit: 5,
  },
  cli: {
    migrationsDir: 'migrations',
  },
}

module.exports = config
