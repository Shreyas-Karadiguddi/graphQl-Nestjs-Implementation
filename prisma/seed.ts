import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Start from a clean database so the seed can be run more than once
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();

  await prisma.company.create({
    data: {
      name: 'Acme Software',
      website: 'https://acme.example.com',
      jobs: {
        create: [
          {
            title: 'Backend Developer',
            description: 'Build GraphQL APIs with NestJS and Prisma.',
            location: 'Berlin',
            remote: false,
            salary: 65000,
          },
          {
            title: 'Frontend Developer',
            description: 'Build user interfaces with React and TypeScript.',
            location: 'Berlin',
            remote: true,
            salary: 60000,
          },
          {
            title: 'QA Engineer',
            description: 'Write automated tests for our web applications.',
            location: 'Munich',
            remote: false,
          },
        ],
      },
    },
  });

  await prisma.company.create({
    data: {
      name: 'Globex Labs',
      website: 'https://globex.example.com',
      jobs: {
        create: [
          {
            title: 'Full Stack Developer',
            description: 'Work across our Node.js backend and React frontend.',
            location: 'London',
            remote: true,
            salary: 70000,
          },
          {
            title: 'DevOps Engineer',
            description:
              'Maintain our CI/CD pipelines and cloud infrastructure.',
            location: 'London',
            remote: false,
            salary: 75000,
          },
          {
            title: 'Junior Developer',
            description:
              'Learn and grow while fixing bugs and shipping features.',
            location: 'Manchester',
            remote: false,
            salary: 35000,
          },
        ],
      },
    },
  });

  await prisma.company.create({
    data: {
      name: 'Initech',
      jobs: {
        create: [
          {
            title: 'Data Engineer',
            description: 'Design data pipelines and reporting tools.',
            location: 'Bangalore',
            remote: true,
            salary: 50000,
          },
          {
            title: 'Technical Writer',
            description: 'Write clear documentation for our developer tools.',
            location: 'Pune',
            remote: true,
          },
        ],
      },
    },
  });

  const companies = await prisma.company.count();
  const jobs = await prisma.job.count();
  console.log(`Seeded ${companies} companies and ${jobs} jobs.`);
}

main().finally(() => prisma.$disconnect());
