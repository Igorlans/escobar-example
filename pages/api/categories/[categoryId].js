import prisma from "@/prisma/client";
async function updateCategory(req, res) {
	try {
		const body = req.body;
		const {categoryId} = req.query;
		const calcOrder = () => {
			if ((body?.order?.trim())=== '') {
				return null;
			}
			if (body.order) {
				return Number(body.order);
			}
		}
		const dbCategory = await prisma.category.findUnique({
			where: {
				id: categoryId
			},
			select: {
				section: true
			}
		})
		const updatedCategory = await prisma.category.update({
			where: {
				id: categoryId
			},
			data: {
				title: body.title,
				view: body.view,
				order: calcOrder(),
				sectionId: body.sectionId
			},
			include: {
				section: true
			}
		})


		res.status(200).json({message: 'good', data: updatedCategory})
		if (updatedCategory?.section?.title_eng === dbCategory?.section?.title_eng) {
			await res.revalidate(`/${updatedCategory?.section?.title_eng}`)
		} else {
			await res.revalidate(`/${updatedCategory?.section?.title_eng}`)
			await res.revalidate(`/${dbCategory?.section?.title_eng}`)
		}
	} catch (e) {
		throw e;
	}
}

async function deleteCategory(req, res) {
	try {
		const {categoryId} = req.query;
		const deletedCategory = await prisma.category.delete({
			where: {
				id: categoryId
			},
			include: {
				section: true
			}
		})
		res.status(200).json({message: 'good', data: deletedCategory});
		await res.revalidate(`/${deletedCategory?.section?.title_eng}`)
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'PUT':
				await updateCategory(req, res);
				break;
			case 'DELETE':
				await deleteCategory(req, res);
				break;
			// case 'PUT':
			// 	await updateProduct(req, res);
			// 	break;
			default:
				await updateCategory(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}