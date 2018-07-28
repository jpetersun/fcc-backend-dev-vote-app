# FCC Vote App

A fullstack javascript app built with the MERN stack (MongoDB, Express, React, Node).

* User Story: As an authenticated user, I can keep my polls and come back later to access them.
* User Story: As an authenticated user, I can share my polls with my friends.
* User Story: As an authenticated user, I can see the aggregate results of my polls.
* User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.
* User Story: As an authenticated user, I can create a poll with any number of possible items.
* User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
* User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)

### Prerequisites

Node 8.10 and up required.

### Installing

Install node_modules, bundle assets with webpack, start a local MongoDB instance, and serve the app on localhost. 

```
npm install

webpack

mongod

npm start
```

Open a page on `localhost:3000`

## Running the tests

With a MongoDB instance running locally, `npm test` to test for basic CRUD operations.

## Built With

* [MongoDB](https://www.mongodb.com/) - Database
* [Express](https://expressjs.com/) - Web framework for Node.js
* [React](https://reactjs.org/) - Interface framework
* [Node](https://nodejs.org/en/) - JavaScript runtime
