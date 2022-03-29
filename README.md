# README #

Please follow this readme instructions to set up the project and database
### What is this repository for? ###

* A payment Api integrated with react client
* Version NodeJS --version [v16.13.2] Postgres --version [v8.7.3]

### How do I get set up? ###

* Go to client directory by [cd client], and do [npm install]
* Go to server directory by [cd server], and do [npm install]
* Install postgres database with pgAdmin client
* Use default database named as postgres, create a new table named [payments]
* Or create table with the help of script mentioned in db_info.txt inside server directory
* Change the DB_NAME, USER, PASSWORD, PORT, etc, as required, inside constants.js & connections.js inside server director.
* Run Server, go to server directory [cd server] run [npm start]
* Run Client, go to client directory [cd client] run [npm start]
  
 ### How do I get set up? ###

 * LiveDemo Video:  https://www.loom.com/share/d96f05c4468c4235a760788822cc2cd1

 
 ### Future Improvements? ###

 * We are using separate routes for all the entities, like payments
 * We can also have controllers to redirect routes to different services, would allow us to reuse routes.
 * Similarly we should be Services that would be responsible to comunicate with database, we can exclude code from payments routes, and put them inside the proper services files.
 * We sould also use sequelize to communicate with the postgres database intead of writing plain queries. 
