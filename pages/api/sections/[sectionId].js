import prisma from "@/prisma/client";
import translit from "@/utils/translit";
async function updateSection(req, res) {
	try {
		const body = req.body;
		const {sectionId} = req.query;
		const updatedSection = await prisma.section.update({
			where: {
				id: sectionId
			},
			data: {
				title: body.title,
				title_eng: translit(body.title),
				order: Number(body?.order) || undefined
			}
		})
		res.status(200).json({message: 'good', data: updatedSection})
	} catch (e) {
		throw e;
	}
}

async function deleteSection(req, res) {
	try {
		const {sectionId} = req.query;
		const deletedSection = await prisma.section.delete({
			where: {
				id: sectionId
			}
		})
		res.status(200).json({message: 'good', data: deletedSection});
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'PUT':
				await updateSection(req, res);
				break;
			case 'DELETE':
				await deleteSection(req, res);
				break;
			// case 'PUT':
			// 	await updateProduct(req, res);
			// 	break;
			default:
				await updateSection(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}