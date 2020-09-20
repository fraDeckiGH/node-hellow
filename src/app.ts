import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { orderRoutes } from './api/routes/orders';
import { productRoutes } from "./api/routes/products";


const app: /* express. */Application = express();
export default app;



// =======================================================================
// * db connection: connecting this app to MongoDB Atlas's cluster
// option chosen: mongoDB's native drivers

(async function() {
	try {
		await mongoose.connect(
			"mongodb+srv://" + process.env.DB_USER_USER + ":" + 
			process.env.DB_USER_PSW + "@" + 
			process.env.DB_NAME + ".xf24j.mongodb.net/" + 
			process.env.DB_NAME + "?retryWrites=true&w=majority",
			{ 
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		);
		// console.log("DB connected to the server");
	} catch (e) {
		console.error(e);
	}
}());

// END db connection
// =======================================================================



// these middlewares only belong before the routes

app.use(
	// bodyParser
	// what we'll be able to find in APIs' req.body
	express.json(),
	express.urlencoded({ extended: false }),
	
	// morgan needs to intercept api requests to work
	// hence is "used" before the routes
	morgan("dev")
);

// morgan needs to intercept api requests to work
// hence is "used" before the routes
// app.use(morgan("dev"));


// explained in e05p2 (2nd part): 
// "Parsing the Body & Handling CORS | Creating a REST API with Node.js"
// https://www.youtube.com/watch?v=zoSJ3bNGPp0&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=6&t=0s
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	
  if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods', 
			'PUT, POST, PATCH, DELETE, GET'
		);
		
		return res.status(200).json({});
	}
	
  next();
});



// ---------------------- Routes ----------------------
// routes which should handle requests

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);



// =======================================================================
// error handling

app.use((req, res, next) => {
	const error = new Error("route not found!");
	
	// error["status"] = 404;
	(error as any).status = 404;
	
	// concludes the req w/ an error
	// without this the req doesn't conclude
	next(error);
});


// catch errors thrown from anywhere else.
// e.g. failed db operations, normal errors in the code of this app...
app.use((err: Error, req: Request, 
		res: Response, next: NextFunction) => {
	console.error("err.stack", err.stack);
	
	res.status((err as any).status || 500);
	
	res.json({
		error: err.message
	});
});

// END error handling
// =======================================================================






