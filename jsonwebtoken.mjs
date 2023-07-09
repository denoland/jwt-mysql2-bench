import { run, bench } from "mitata";
import jwt from "jsonwebtoken";

const jwtSecret = "JWT_SECRET";
const token = jwt.sign({ foo: 'bar' }, jwtSecret);

bench("verify", async () => {
  await jwt.verify(token, jwtSecret);
});

run();
