import { Hono } from 'https://deno.land/x/hono/mod.ts';
import jwt from "npm:jsonwebtoken";
import mysql from "npm:mysql2/promise";
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

  
  const [rows] = await connection.query(
    `SELECT * FROM users WHERE EMAIL = '${email}' LIMIT 1`,
  );

  return c.body(rows[0]);
});

Deno.serve(app.fetch);

