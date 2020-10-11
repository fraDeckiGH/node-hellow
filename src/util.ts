// utility

import { Response } from "express";




export const REGEX = Object.freeze({
	EMAIL: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
});


export enum ResponseId {
	DocAlreadyExists = "doc-already-exists",
	DocCreated = "doc-created",
	DocDeleted = "doc-deleted",
	DocNotFound = "doc-not-found",
	DocRetrieved = "doc-retrieved",
	DocsRetrieved = "docs-retrieved",
	DocUpdated = "doc-updated",
};


export function apiError(e: any, res: Response) {
	console.error(e);
	
	res.status(500).json({
		error: e
	});
};


export function sortSchemaKeys(ret: any) {
	// https://mongoosejs.com/docs/api/document.html#document_Document-toJSON
	// (scroll a bit to the bottom)
	
	// console.log("doc", doc); // gives error
	// console.log("ret", ret);
	// console.log("opts", opts);
	
	let newObj: any = {};
	
	Object.keys(ret)
		.sort()
		.forEach((key: string) => {
			newObj[key] = ret[key];
		});
	
	return newObj;
};













