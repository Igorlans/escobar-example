import withAuth from "@/components/adminpanel/WithAuth";
import AdminLayout from "@/components/Layouts/AdminLayout";
import Products from "@/components/adminpanel/Products/Products";
import prisma from "@/prisma/client";

export async function getServerSideProps() {
    try {
        let products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                category: true
            }
        })
        products = JSON.stringify(products)
        products = JSON.parse(products)
        console.log(products)
        let categories = await prisma.category.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
            }
        })
        return {
            props: {
                products: products || [],
                categories: categories || [],
            }
        }
    } catch (e) {
        console.error(e)
        return {
            props: {
                products: [],
                categories: [],

            }
        }
    }
}
const ProductsPage = ({products, categories}) => {
    return (
        <AdminLayout title={'Escobar | Продукти'}>
            <Products productsData={products} categoriesData={categories}/>
        </AdminLayout>
    )
}

export default withAuth(ProductsPage)
