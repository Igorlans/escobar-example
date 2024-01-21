import prisma from "@/prisma/client";
// async function getProducts(req, res) {
// 	try {
// 		const categories = await prisma.category.findMany();
// 		return res.status(200).json({message: 'good', data: categories})
// 	} catch (e) {
// 		throw e;
// 	}
// }

async function createProduct(req, res) {
	try {
		const body = req.body;
		const newProduct = await prisma.product.create({
			data: {
				title: body.title,
				categoryId: body.categoryId,
				price: body?.price || undefined,
				description: body?.description,
				amount: body?.amount,
				order: Number(body?.order) || undefined,
				imageName: body?.imageName,
				imageUrl: body?.imageUrl
			},
			include: {
				category: {
					include: {
						section: true
					}
				}
			}
		})
		res.status(201).json({message: 'good', data: newProduct})
		await res.revalidate(`/${newProduct?.category?.section?.title_eng}`)
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'POST':
				await createProduct(req, res);
				break;
			// case 'PUT':
			// 	await updateProduct(req, res);
			// 	break;
			default:
				res.status(400).json({message: 'Unsupported method'})
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}