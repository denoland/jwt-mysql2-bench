
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "dbpwd",
  database: "testdb",
});

const promises = [];
for (let i = 0; i < 100_000; i++) {
	const email = `${i}@divy.work`
	promises.push(connection.execute(`INSERT INTO users SET email="${email}"`));
}

await Promise.all(promises);
