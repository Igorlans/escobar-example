import prisma from "@/prisma/client";
async function getCategories(req, res) {
	try {
		const categories = await prisma.category.findMany();
		return res.status(200).json({message: 'good', data: categories})
	} catch (e) {
		throw e;
	}
}

async function createCategory(req, res) {
	try {
		const body = req.body;
		const newCategory = await prisma.category.create({
			data: {
				title: body.title,
				view: body.view,
				order: Number(body?.order) || undefined,
				sectionId: body.sectionId
			},
			include: {
				section: true
			}
		})
		res.status(201).json({message: 'good', data: newCategory})
		await res.revalidate(`/${newCategory?.section?.title_eng}`)
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'GET':
				await getCategories(req, res);
				break;
			case 'POST':
				await createCategory(req, res);
				break;
			// case 'PUT':
			// 	await updateProduct(req, res);
			// 	break;
			default:
				await getCategories(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}