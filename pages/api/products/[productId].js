import prisma from "@/prisma/client";
import SupabaseFileService from "@/services/SupabaseFileService";
async function updateProduct(req, res) {
	try {
		console.log('BODY =======', req.body)
		const body = req.body;
		const {productId} = req.query;
		const dbProduct = await prisma.product.findUnique({
			where: {
				id: productId
			},
			include: {
				category: {
					include: {
						section: true
					}
				}
			}
		})

		const calcOrder = () => {
			if ((body?.order?.trim())=== '') {
				return null;
			}
			if (body.order) {
				return Number(body.order);
			}
		}

		const updatedProduct = await prisma.product.update({
			where: {
				id: productId
			},
			data: {
				title: body.title,
				categoryId: body.categoryId,
				price: body?.price || null,
				description: body?.description,
				amount: body?.amount,
				order: calcOrder(),
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

		res.status(200).json({message: 'good', data: updatedProduct})
		if (updatedProduct?.category?.section?.title_eng === dbProduct?.category?.section?.title_eng) {
			await res.revalidate(`/${updatedProduct?.category?.section?.title_eng}`)
		} else {
			await res.revalidate(`/${updatedProduct?.category?.section?.title_eng}`)
			await res.revalidate(`/${dbProduct?.category?.section?.title_eng}`)
		}

	} catch (e) {
		throw e;
	}
}

async function deleteProduct(req, res) {
	try {
		const {productId} = req.query;
		const deletedProduct = await prisma.product.delete({
			where: {
				id: productId
			},
			include: {
				category: {
					include: {
						section: true
					}
				}
			}
		})
		res.status(200).json({message: 'good', data: deletedProduct});
		await SupabaseFileService.removeFile('images', `productImages/${deletedProduct.imageName}`)
		await res.revalidate(`/${deletedProduct?.category?.section?.title_eng}`)
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'PUT':
				await updateProduct(req, res);
				break;
			case 'DELETE':
				await deleteProduct(req, res);
				break;
			// case 'PUT':
			// 	await updateProduct(req, res);
			// 	break;
			default:
				await updateProduct(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}