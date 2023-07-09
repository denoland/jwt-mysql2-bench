import Koa from "koa";
import Router from "@koa/router";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import process from "node:process";

const app = new Koa();
const router = new Router();

const connection = await mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "dbpwd",
  database: "testdb",
});

const jwtSecret = "JWT_SECRET";

console.log(jwt.sign({ email: "100@divy.work" }, jwtSecret));

function getToken(headers) {
  if (
    headers && headers.authorization &&
    headers.authorization.startsWith("Bearer ")
  ) {
    return headers.authorization.split(" ")[1];
  }
}

router.get("/", async (ctx, next) => {
  const rcvdJwt = getToken(ctx.request.headers);
  let email;
  try {
    const payload = jwt.verify(rcvdJwt, jwtSecret);
    email = payload.email;
  } catch (e) {
    return ctx.response.status = 401;
  }

  const [rows] = await connection.query(
    `SELECT * FROM users WHERE EMAIL = '${email}' LIMIT 1`,
  );
  ctx.response.body = rows[0];
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8000);

