import express from 'express';
import { productRoutes } from "./api/routes/products.js";


const app = express();
app.use("/products", productRoutes);




export { app };
