import express, { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { routerOrder } from './api/route/rOrder';
import { routerProduct } from "./api/route/rProduct";
import { routerUser } from "./api/route/rUser";


const app: Application = express();
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
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		// console.log("DB connected to the server");
	} catch (e) {
		console.error(e);
	}
}());



// =======================================================================
// middleware (only belong before the routes)

// bodyParser
// what we'll be able to find in APIs' req.body
app.use(
	json(),
	urlencoded({ extended: false }),
);

// (CORS) e05p2 "Parsing the Body & Handling CORS"
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
		
		return res.status(200)/* .json({}) */;
	}
	
  next();
});

// morgan needs to intercept api requests to work
// hence is "used" before the routes
app.use(morgan("dev"));

// multer (req.file) (e10  Uploading an Image)
// to be specific: make "uploads" dir accessible by URL
// eg  http://localhost:3000/uploads/fileName.ext  or 
// http://localhost:3000/uploads\\fileName.ext
app.use('/uploads', express.static('uploads'));



// =======================================================================
// routes - which handle requests

app.use("/order", routerOrder);
app.use("/product", routerProduct);
app.use("/user", routerUser);



// =======================================================================
// error handling

app.use((req, res, next) => {
	const err = new Error("route not found!");
	(err as any).status = 404;
	
	// concludes the req w/ an error
	// w/out this the req doesn't conclude
	next(err);
});

// catch errors thrown from anywhere else.
// e.g. failed db operations, normal errors in the code of this app...
app.use((err: Error, req: Request, 
	res: Response, next: NextFunction) => {
	
	console.error("err.stack", err.stack);
	
	// res.status((err as any).status || 500);
	// res.json({
	// 	error: err.message
	// });
	res.status((err as any).status || 500).json({
		error: err.message,
	});
});











