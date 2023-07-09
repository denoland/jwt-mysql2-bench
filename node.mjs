import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import jwt from "jsonwebtoken";
import mysql from "mysql2";
import process from "node:process";

const app = new Hono();

const connection = await mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "dbpwd",
  database: "testdb",
});

const jwtSecret = "JWT_SECRET";

function getToken(c) {
  const authorization = c.req.header('Authorization');
  if (
    authorization &&
    authorization.startsWith("Bearer ")
  ) {
    return authorization.split(" ")[1];
  }
}

app.get('/', async (c) => {
  const rcvdJwt = getToken(c);
  let email;
  try {
    // const payload = jwt.verify(rcvdJwt, jwtSecret);
    // email = payload.email;
    email = rcvdJwt;
  } catch (e) {
    console.error(e);
    return c.text(e);
  }

  
  const [rows] = await query(
    `SELECT * FROM users WHERE EMAIL = '${email}' LIMIT 1`,
  );

  return c.body(rows[0]);
});

function query(q) {
  return new Promise(r => {
	connection.query(q, (_, results, fields) => r([results, fields]))	
  });
}

serve({
  fetch: app.fetch,
  port: 8000,
});

console.log("Listening on 8000");
