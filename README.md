# GraphQL-Nest Implementation

A small GraphQL API for a job board, built with NestJS. Companies post jobs;
you can list, filter, create, update and delete them, and query nested data
(jobs with their company, companies with their jobs) in a single request.

## Tech stack

- [NestJS](https://nestjs.com/) with TypeScript
- GraphQL with `@nestjs/graphql` and the Apollo driver (code-first)
- [Prisma](https://www.prisma.io/) ORM with SQLite
- `class-validator` for input validation

## Setup

You need Node.js 22.18 or newer (the seed script runs TypeScript directly with Node).

```bash
npm install
npx prisma migrate dev   # creates the SQLite database (prisma/dev.db)
npm run seed             # adds 3 companies and 8 jobs
npm run start:dev
```

Then open http://localhost:3000/graphql to use Apollo Sandbox.

If port 3000 is already in use, pick another one: `PORT=3100 npm run start:dev`.

## Project structure

```
prisma/
  schema.prisma      # database models
  seed.ts            # sample data
src/
  prisma/            # shared PrismaService (database access)
  companies/         # module, resolver, service, model, input DTO
  jobs/              # module, resolver, service, model, input DTOs
  app.module.ts      # GraphQL setup, imports the feature modules
  main.ts            # starts the app, enables validation
  schema.gql         # GraphQL schema, generated automatically on startup
```

## Example queries

Copy any of these into the playground.

**1. All jobs with their company (nested query)**

```graphql
query {
  jobs {
    id
    title
    location
    remote
    salary
    company {
      id
      name
    }
  }
}
```

**2. Filter jobs by location and remote**

```graphql
query {
  jobs(location: "London", remote: true) {
    id
    title
    location
    remote
  }
}
```

**3. One company with all its jobs**

```graphql
query {
  company(id: 1) {
    name
    website
    jobs {
      title
      location
    }
  }
}
```

**4. Create a company**

```graphql
mutation {
  createCompany(
    input: { name: "Umbrella Corp", website: "https://umbrella.example.com" }
  ) {
    id
    name
    website
  }
}
```

**5. Create a job**

```graphql
mutation {
  createJob(
    input: {
      title: "Security Engineer"
      description: "Keep our systems safe."
      location: "Berlin"
      remote: true
      salary: 80000
      companyId: 1
    }
  ) {
    id
    title
    company {
      name
    }
  }
}
```

**6. Update and delete a job**

```graphql
mutation {
  updateJob(id: 1, input: { title: "Senior Backend Developer", salary: 85000 }) {
    id
    title
    salary
  }
}
```

```graphql
mutation {
  deleteJob(id: 8) {
    id
    title
  }
}
```

## Errors

- Invalid input (for example an empty `title`) returns a `BAD_REQUEST` error.
- Asking for a company or job that doesn't exist returns a "not found" error.
