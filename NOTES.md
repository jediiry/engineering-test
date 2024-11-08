write any notes here

- Review the `eurocamp_api` database and make notes on the current structure and state of the database. How would you improve it using relational database best practices? We're mainly interested in how you would improve the database theoretically

After assessing the existing database, which consists of three tables - booking, parc and user:

- The user table has the fields - id, name and email.
-  The parc table has the fields - id, name, description.
-  The booking table has the fields - id, user, parc, bookingDate and comment
  

Here are the improvements I would make:

1. Index Foreign keys user and parc in the booking tablee to improve query performance.
2. Include timestamps created_at and updated_at columns to each table to monitor when the record was created and last updated.
3. Move the comment to a seperate table to increase databbase performance and scalability.
4. Enable cascade delete for user so that removing a user can deletes their relateed reservations
5. Ensure unique email address to avoid email duplication.

- Brief explanation of the latest practices in your respective field of expertise

For scalibility, backend development priorities microservices and serverless archtectures, which are frquently  used alongside event-driven systems that relies on tools such as kakfa and rabbitmq.
Containnerisation using docker, CI/CD pipeline and kubernetes (EKS or GKE) help to automate and scale deployments. API-first architecture and GraphQL provides more efficient and flexibble data retrieval.
Security is based on zero-trust conscepts, secure coding methods and regulatory complaince.


Create a Node client service that consumes the api (as seen on http://localhost:3001/api) and actions the api endpoints. This service should handle api failures or bad responses. 

An example of a test(s) is expected.

Here’s a clearer and concise version of the instructions:

---

**Note**: The client implementation is located in `apps/engineering/src/service`, and it includes a test file named `user.spec.ts`.

To run the tests, please follow these steps:

1. Install the required dependencies:
   npm install axios --legacy-peer-deps
   npm install tslib --legacy-peer-deps
   

2. After the dependencies are installed, you can run the tests.