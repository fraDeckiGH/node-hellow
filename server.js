import { createServer } from "http";
// @ts-ignore
import { app } from "./app.mjs";

const port = process.env.PORT || 3000;

const server = createServer(app);
server.listen(port);


// >> in node 12.18.3
// run with (app[.js]):
// node server.js --experimental-modules


// >> in node 14.8.0
// run with (app.mjs):
// node server.js