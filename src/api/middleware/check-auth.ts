import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ResponseId } from "../../util";



export default (req: Request, res: Response, 
	next: NextFunction) => {
	
	console.log("req.headers", req.headers);
	
	if (req?.headers?.authorization) {
		const token: string = 
			req.headers.authorization.split(" ")[1];
		
		try {
			// (req as any).userToken = 
				jwt.verify(token, process.env.JWT_KEY + "");
			
			next();
		} catch (error) {
			res.status(401).json({
					id: ResponseId.Unauthorized,
			});
		}
	} else {
		res.status(400).json({
			id: "no-token",
		});
	}
	
}