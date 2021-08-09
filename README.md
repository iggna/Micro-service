# Micro-Service API REST

A challenge project for Rooftop academy
(REST APis using Node.js, TypeScript, Express, TypeORM)

## Features
- **TypeScript**: [Ts-node](https://www.npmjs.com/package/ts-node)
- **Develop**: [Nodemon](https://nodemon.io/)
- **ORM**: [TypeORM](https://typeorm.io/#/)
- **Dependency management**: with [Npm](https://docs.npmjs.com/about-npm/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

## Getting Started
### Installation

```bash
git clone https://github.com/iggna/Micro-service.git
cd Micro-Service
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:
```bash
cp .env.example .env
# open .env and modify the environment variables
```

### Commands

Running locally:

```bash
npm run dev
```

### API Endpoints

List of available routes:

**User routes**:\
`GET /coupons?code=&customer_email=` - checks if a coupon matches an email\
`POST /coupons?code=` - creates a new Coupon\
`PATCH /coupons?customer_email=` - assigns an new email to an existing coupon\
`DELETE /coupons?id=` - deletes a coupon\
`GET /stores?page=` - get stores & counts the total of the stores\
`POST /stores?name=&address=` - create a new store by the name and address\
`DELETE /stores?id=` - deletes a store\
`GET /stats` - gets statistics and history information of existing coupons, assignated coupons, not assigned coupons,coupons created per day and coupons assigned per day\

### Information
- Please add deleted_at and created_at columns to Coupons in PostgreSQL.
- Please add deleted_at column to Stores in PostgreSQL.
- Columns added have a data type assigned as timestamp without time zone. 
- In order to not delete any physical data, I added a deleted_at column at the database, both Coupons and Stores, this way we can make a softDelete and restore it in the future.
- In order to show some values at GET STATS I created a column in Coupons named created_at, this way, we can assign values and count how many coupons were created per day.

## Postman Collection

Import "API-REST-Collection.postman_collection.json" file into Postman App to see examples of requests.

## Links that helped me through the project:

- Install ORM https://typeorm.io/#/
- Install JOI/ Documentation https://joi.dev/api/?v=17.4.2
- Validate code column https://github.com/typeorm/typeorm/blob/master/docs/entities.md, https://typeorm.delightful.studio/classes/_error_columntypeundefinederror_.columntypeundefinederror.html
- Dotenv config https://www.npmjs.com/package/dotenv, https://typeorm.io/#/using-ormconfig/using-environment-variables
- Fix query string GET COUPONS https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript
- findONE for GET COUPONS https://typeorm.io/#/active-record-data-mapper
- Turn into STRING CODE https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions
- Random date for POST COUPONS https://www.npmjs.com/package/@js-random/date
- Error type of data in req.id (DELETE) https://stackoverflow.com/questions/58923573/error-ts2352-conversion-of-type-session-null-to-type-x-string-y-strin
- Add Deleted_at https://orkhan.gitbook.io/typeorm/docs/decorator-reference#deletedatecolumn
- Pagination for GET Stores https://typeorm.io/#/find-options
- How to count days for GET STATS https://typeorm.io/#/select-query-builder
- Creating first collection in postman https://learning.postman.com/docs/getting-started/creating-the-first-collection/















