import withAuth from "@/components/adminpanel/WithAuth";
import AdminLayout from "@/components/Layouts/AdminLayout";
import prisma from "@/prisma/client";
import Sections from "@/components/adminpanel/Sections/Sections";

export async function getServerSideProps() {
    try {
        let sections = await prisma.section.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        sections = JSON.stringify(sections)
        sections = JSON.parse(sections)
        console.log(sections)
        return {
            props: {
                sections: sections || [],
            }
        }
    } catch (e) {
        console.error(e)
        return {
            props: {
                sections: [],
            }
        }
    }
}
const SectionsPage = ({sections}) => {
    return (
        <AdminLayout title={'Escobar | Розділи'}>
            <Sections sectionsData={sections}/>
        </AdminLayout>
    )
}

export default withAuth(SectionsPage)
