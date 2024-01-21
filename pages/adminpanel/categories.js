import withAuth from "@/components/adminpanel/WithAuth";
import AdminLayout from "@/components/Layouts/AdminLayout";
import prisma from "@/prisma/client";
import Categories from "@/components/adminpanel/Categories/Categories";

export async function getServerSideProps() {
    try {
        let categories = await prisma.category.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                section: true
            }
        })
        categories = JSON.stringify(categories)
        categories = JSON.parse(categories)
        console.log(categories)
        let sections = await prisma.section.findMany({
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
                categories: categories || [],
                sections: sections || [],
            }
        }
    } catch (e) {
        return {
            props: {
                sections: [],
                categories: [],

            }
        }
    }
}
const CategoriesPage = ({categories, sections}) => {
    return (
        <AdminLayout title={'Escobar | Категорії'}>
            <Categories categoriesData={categories} sectionsData={sections} />
        </AdminLayout>
    )
}

export default withAuth(CategoriesPage)
