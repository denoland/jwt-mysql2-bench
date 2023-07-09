import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

router.get("/", (ctx) => ctx.response.body = "Hello, World!");

app.use(router.routes()).use(router.allowedMethods());

app.listen(8000);

