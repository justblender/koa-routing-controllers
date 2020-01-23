# koa-routing-controllers

Create highly performant and well-structured class-based controllers for Koa 2 using TypeScript.

**NOTE:** This is a "work in progress" project and many features are currently absent. Pull requests are welcome! :)

## Installation

1. Install this package:

`npm install koa-routing-controllers`

2. Install [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) package:

`npm install reflect-metadata`

and make sure to import it before using this package:

```typescript
import "reflect-metadata"
```

3. Make sure you have `experimentalDecorators` and `emitDecoratorMetadata` options enabled in `tsconfig.json`:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## Usage

```typescript
import "reflect-metadata";

import { Controller, Get, Param, createKoaServer } from "koa-routing-controllers";

@Controller()
export class HelloWorldController {
  @Get("/")
  helloWorld() {
    return "Hello, world!";
  }

  @Get("/:name")
  greetByName(@Param("name") name: string) {
    return `Hello, ${name}!`;
  }
}

createKoaServer({
  controllers: [
    HelloWorldController
  ]
}).listen(8080, () => {
  console.log("Listening on http://localhost:8080");
});
```

## Roadmap

- [x] Add needed decorators
- [x] Add more type coverage
- [x] Add support for injectable parameters
- [ ] Add support for scoped middlewares
- [ ] Add support for body/query validation
- [ ] Add documentation
