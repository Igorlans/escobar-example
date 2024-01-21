import prisma from "@/prisma/client";
import translit from "@/utils/translit";
async function getSections(req, res) {
	try {
		const sections = await prisma.section.findMany({
			orderBy: [
				{ order: 'asc' },
				{ createdAt: 'desc' },
			]
		});
		return res.status(200).json({message: 'good', data: sections })
	} catch (e) {
		throw e;
	}
}

async function createSection(req, res) {
	try {
		const body = req.body;
		const newSection = await prisma.section.create({
			data: {
				title: body.title,
				title_eng: translit(body.title),
				order: Number(body?.order) || undefined
			}
		})
		res.status(201).json({message: 'good', data: newSection})
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'GET':
				await getSections(req, res);
				break;
			case 'POST':
				await createSection(req, res);
				break;
			// case 'PUT':
			// 	await updateProduct(req, res);
			// 	break;
			default:
				await getSections(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}