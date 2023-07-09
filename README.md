```sql
CREATE USER 'dbuser'@'localhost' IDENTIFIED BY 'dbpwd';
GRANT ALL PRIVILEGES ON *.* TO 'dbuser'@'localhost' WITH GRANT OPTION;

CREATE DATABASE testdb;
USE testdb;

CREATE TABLE users (
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  first VARCHAR(255),
  last VARCHAR(255),
  city VARCHAR(255),
  county VARCHAR(255),
  age INT
);
```

After this setup, run the `insert_100k.mjs` script to populate the table.

Standalone benchmarks:

- `koa.mjs` - Koa hello world router. (Deno, Node, Bun)
- `jsonwebtoken.mjs` - jwt.verify micro-benchmark. (Deno and Node)
