import "reflect-metadata";

import { Controller, Get, Param, createKoaServer } from "../src/index";

@Controller("/hello")
class HelloWorldController {
  @Get()
  helloWorld() {
    return "Hello, world!";
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
