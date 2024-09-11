import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3001),
  HOST: z.coerce.string().default('0.0.0.0'),
  JWT_SECRET: z.string(),
  DATABASE_PORT: z.coerce.number().default(27017),
  USERS_COLLECTION: z.string().default('users'),
  CARS_COLLECTION: z.string().default('cars'),
  MONGO_INITDB_ROOT_USERNAME: z.string(),
  MONGO_INITDB_ROOT_PASSWORD: z.string(),
  MONGO_INITDB_DATABASE: z.string(),
  TOKEN_EXPIRATION: z.string().optional().default('15m'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
