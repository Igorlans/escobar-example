import MainLayout from "@/components/Layouts/MainLayout";
import prisma from "../prisma/client";
import ProductList from "@/components/ProductList/ProductList";


export async function getStaticPaths() {
    const sections = await prisma.section.findMany({
        select: {
            title_eng: true
        }
    })
    if (sections.length) {
        const paths = sections.map(section => ({params: {section: section.title_eng}}))
        return {
            paths,
            fallback: 'blocking'
        }
    }
}
export async function getStaticProps({params}) {

    const section = await prisma.section.findFirst({
        where: {
            title_eng: params.section
        }
    })
    const categories = await prisma.category.findMany({
        where: {
            section: {
                title_eng: params.section
            }
        },
        orderBy: [
            { order: 'asc' },
            { createdAt: 'desc' },
        ],
        include: {
            products: {
                orderBy: [
                    { order: 'asc' },
                    { createdAt: 'desc' },
                ],
            }
        }
    })
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            section: JSON.parse(JSON.stringify(section)),
        },

        // revalidate: 300// will be passed to the page component as props
    }
}
export default function Section({categories, section}) {
    return (
        <MainLayout title={'Escobar | ' + section?.title}>
            <ProductList categories={categories} />
        </MainLayout>
    )
}
