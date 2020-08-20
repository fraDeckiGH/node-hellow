import { createServer } from "http";
import { app } from "./app.mjs";

const port = process.env.PORT || 3000;

const server = createServer(app);
server.listen(port);


// run with:
// node server.js --experimental-modules