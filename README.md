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
