import express from 'express';
import morgan from 'morgan';
import { productRoutes } from "./api/routes/products.js";


const app = express();

// morgan needs to intercept api requests to work
// hence is "used" before the routes
app.use(morgan("dev"));

// routes which should handle requests
app.use("/products", productRoutes);


// =======================================================================
// error handling

app.use((req, res, next) => {
	const error = new Error("route not found!");
	
	error["status"] = 404;
	
	// concludes the req w/ an error
	// without this the req doesn't conclude
	next(error);
});


// catch errors thrown from anywhere else.
// e.g. failed db operations, normal errors in this code...
app.use((err, req, res, next) => {
	console.error("err.stack", err.stack);
	
	res.status(err.status || 500);
	
	res.json({
		error: {
			message: err.message
		}
	});
});

// END error handling
// =======================================================================



// export default app;
export { app };

