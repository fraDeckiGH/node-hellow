import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ResponseId } from "../../util";


// TODO the code below can be written WAY better

export default (req: Request, res: Response, next: NextFunction) => {
	
	try {
		const token: string | undefined = 
			req.headers && 
			req.headers.authorization && 
			req.headers.authorization.split(" ")[1];
			
		(req as any).userData = 
			jwt.verify(token + "", process.env.JWT_KEY + "");
		
		next();
		
	} catch (error) {
		res.status(401).json({
				id: ResponseId.Unauthorized,
		});
	}
	
}