import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from 'crypto';
import { config } from 'dotenv';
import { DomainEvents } from '@/core/events/domain-events';
import { envSchema } from '@/infra/env/env';
import Redis from 'ioredis';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const env = envSchema.parse(process.env);

const prisma = new PrismaClient();
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

const schema = randomUUID();

function generateUniqueDatabaseURL() {
  if (!env.DATABASE_URL) {
    throw new Error('Database url not specified');
  }

  const databaseUrl = new URL(env.DATABASE_URL);

  databaseUrl.searchParams.set('schema', schema);

  return databaseUrl.toString();
}

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL();

  env.DATABASE_URL = databaseUrl;

  DomainEvents.shouldRun = false;

  execSync('npx prisma migrate deploy');

  await redis.flushdb()
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await prisma.$disconnect();
});
