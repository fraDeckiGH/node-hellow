// utility

import { Response } from "express";


export function apiError(e: any, res: Response) {
	console.error(e);
	
	res.status(500).json({
		error: e
	});
}
















