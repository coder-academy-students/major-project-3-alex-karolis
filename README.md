# SuperSearch Application

### Major Project for codefactory academy bootcamp

#### Clone Repository

`git clone git@github.com:alexi21/SuperSearchProjectFolder.git supersearch`

#### Install and start rethinkDB

`cd supersearch && npm install rethinkdb && rethinkdb`

#### Start server API

`cd supersearch/server && npm run dev`

#### Start frontend

`cd supersearch/frontend && npm start`

#### Open application

Navigate to localhost:8000 in your web browser

Signup and navigate away...

## Client interaction

### Demonstrate your ability to satisfy your client with the quality of your work and high level of service.

1. Record all interactions with your client in a diary format.

  - email records provided to head teacher



2. Plan information gathering activities to determine project requirements, constraints and risks.

  - Research requirements constraints and risks.

####Client requirements:

  Client has two main requirements.

  The first requirement was the ability to store and parse a large database. It was decided due to the shape of the data, and the dynamic manner in which the data would be created and stored that a noSQL database should be used. Initially we discussed using MongoDB, however due to the flexibility provided by using thinky.io as an ORM wrapper for RethinkDB we decided to try using thinky.io and rethinkDB together. This pattern enabled me to create dynamic joins on database queries that allowed a great deal of flexibility in the way the documents are stored and queried.

  RethinkDB has its own query language Reql which is a powerful functional programming style query language that is compatible with functional programming patterns in javascript.

  At this point we also decided that the server should be built in javascript using node.js as the client was concerned with the possibility of scale, and to allow a more seamless interaction with the noSQL database that we would choose. Whether that be MongoDB or RethinkDB.

  This led to some useful functional programming on the backend, and a simplicity overall in the design of the API.

  For eg. the Data model is a flat document that grows through a join query to include an array of associated documents. with the following pattern:

  `Data.get(dataId).getJoin().run()
    .then(function(data) {
      res.json(data);
    })`

  Made possible using the thinky.io ORM pattern:

  `Data.hasMany(DataComment, 'comments', 'id', 'postId');`

  Of course storing the associated comment with the correct information to allow that join does involve an additional layer of complexity, however because the `id` of the data is passed to the API when a associated data 'comment' is created, that id is simply saved as a property in the document.

  Similar to other SQL and noSQL patterns, RethinkDB and thinky.io provide neat solutions to consistently saving data with the requisite information such as when it is created. Unlike Rails and ActiveRecord this must be explicitly declared. For example:

  `Data.pre('save', function(next) {
    const data = this;
    data.createdAt = new Date();
    next();
  });`

  This did add complexity over similar design patterns in ROR particularly in the hashing of passwords before storage in the database, however, it does remove the abstraction and allow further refinement as requirements change. This adds risks to the project, in that patterns must be thoroughly tested before production as they have not been vetted through the community. The added power this affords in the refinement of the code as the project grows was deemed appropriate.

  The rest of the server runs on a simple node.js and express framework that has no design antipatterns.

  Passport and Bcrypt are used to hash passwords, create and provide JWTs to users, and run the logic for authentication on the server. The server itself is a fully authenticated API that requires users to signin, signup, or have the required JWT associated with their user id.

3. Develop project charter, including preliminary statement of project scope and obtain sign-off
4. Prepare project work breakdown, schedule and budget
5. Compile project management plan documents as necessary to communicate the intended management strategy for the project and obtain sign-off
6. Identify and select team members, and allocate roles and responsibilities, based on project solution requirements
7. Determine training and support needs of team members
8. Establish project team values and agreed behavioural standards with team members
9. Monitor delivery and acceptance of assigned project team work activities and manage individuals
10. Monitor and control project scope changes, risks and issues
11. Manage system testing and hand over activities
12. Prepare IT support plans and maintenance or support documents
13. Obtain final project sign-off
14. Conduct post project review
15. Create a questionnaire for the client to ascertain the satisfaction with your product and service.


### Application Design

#### Demonstrate your ability to break down the problem and design a solution.

1. One page summary of your application including problem definition, solution.
2. Determine the appropriate client technology, development tools, and platform for writing the UI
3. Review the conceptual design with the client, and edit as required
4. A workflow diagram of the user journey/s.
5. Wireframes for at least 5 screens.
6. User stories for the whole application.
7. Entity Relationship Diagram (ERD).
8. Project plan and effort estimation.
9. Tools and methodologies

  - Trello or similar project management tool to be used to track progress of build.

  - Show evidence of Slack conversations or use of other communication tools.

  - Code review. Demonstrate that you have had your code reviewed by other students and that you have provided a code review for others.

  - Github. Demonstrate use of frequent commits, pull requests, documentation.

  - Use Agile development methodologies.

  - Provide evidence you have used code quality tools
