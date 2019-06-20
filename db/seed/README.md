## Database Seeding Scripts ReadMe

#### Requirements

- *PostgreSQL*
- If using `.js` seeding scripts instead of `.sql`: *Node.js 10+*
- If seeking to test production-level data volume (tested on 70mm rows of `comments` and 20mm rows of `users`): *at least 20 gigabytes of database storage*

#### Key Considerations
- CommentStarter is designed to use `PostgreSQL` as the database management system 
- Data is stored in two tables: `comments` and `users`
-- Users and comments have an one-to-many relationship, such that each user may have one comment, but each comment only has one user as the author
- The `archive` folder includes a few alternative options, including the option to use `mongodb`. However, they are not tested and should only serve as reference. 

#### Initializing Tables
- The scripts used to establish the appropriate database tables are:
-- `SQLgenerateCommentsTable.js` and `SQLgenerateUsersTable.js`
- Alternatively, you may execute the two `.sql` files directly in the `psql` CLI

#### Database Seeding
- The scripts for seeding `comments` and `users` tables are in the `postgres` folder
> The seeding scripts are reliant on environmental variables:
> - `PGHOST`: PostgreSQL host address 
> - `PGPORT`: PostgreSQL port 
> - `PGDATABASE`: PostgreSQL database 
> - `PGUSER`: PostgreSQL username 
> - `PGPASSWORD`: PostgreSQL password 
> - `START_ROW`: The number of rows that already exist in the database. In a freshly generated database, this should be `0`. However, for example, if you have already seeded 1mm records in the past, this should be set to `1000000` (such that the next new row will start with an `id` of `1000001`). Defaults to `0`
> - `ITERATIONS` / `SEEDCOUNT`: The number of "rounds" of seeding, and amount of records seeded per round. The `SEEDCOUNT` should be adjusted based on the CPU and memory available to Node.js. For example, on an AWS EC2 T2-micro, `SEEDCOUNT` has been tested up to 1mm. A higher `SEEDCOUNT` will result in faster seeding, but will use more memory
> -- `ITERATIONS` defaults to `1` and `SEEDCOUNT` defaults to `1000000`
> - `LOGMEMORY`: If set to `true`, the script will periodically log the memory used. This may be used to calibrate the size of `SEEDCOUNT`. Defaults to `false`
