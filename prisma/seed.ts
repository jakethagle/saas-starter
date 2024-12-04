/**
 * Adds seed data to your db
 *
 * @see https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultUser = {
    email: 'jakethagle@protonmail.com',
    firstName: 'Jake',
    lastName: 'Hagle',
  };

  const { id: tenantId } = await prisma.tenant.create({
    data: {
      name: 'Acme Co',
    },
  });
  await prisma.user.create({
    data: {
      email: defaultUser.email,
      // firstName: defaultUser.firstName,
      // lastName: defaultUser.lastName,
      name: `${defaultUser.firstName} ${defaultUser.lastName}`,
      userTenants: { create: { role: 'Admin', tenantId: tenantId } },
    },
  });

  const firstPostId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  await prisma.post.upsert({
    where: {
      id: firstPostId,
    },
    create: {
      id: firstPostId,
      title: 'First Post',
      text: 'This is an example post generated from `prisma/seed.ts`',
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
