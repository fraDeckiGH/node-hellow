
// Promise based, also non-blocking
// const { readFile } = require('fs').promises;
import { readFile } from "fs/promises";

async function hello() {
	const txt = await readFile('./hello.txt', 'utf8');
}










