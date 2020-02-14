import "reflect-metadata";

import { Controller, Get, Param, createKoaServer, Ctx } from "../src";
import { Context } from "koa";

@Controller("/hello")
class HelloWorldController {
  @Get()
  helloWorld(@Ctx() ctx: Context) {
    ctx.throw(404);
  }

  @Get("/:name")
  greetByName(@Param("name") name: string) {
    return `Hello, ${name}!`;
  }
}

createKoaServer({
  controllers: [HelloWorldController]
}).listen(8080, () => {
  console.log("Listening on http://localhost:8080");
});
