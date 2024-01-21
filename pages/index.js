import MainLayout from "@/components/Layouts/MainLayout";
import prisma from "../prisma/client";
import {useEffect, useLayoutEffect} from "react";
import {useRouter} from "next/navigation";

export async function getServerSideProps() {

    const firstSection = await prisma.section.findFirst({
        orderBy: [
            { order: 'asc' },
            { createdAt: 'desc' },
        ],
        select: {
            title_eng: true
        }

    })

    if (!firstSection) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            path: `/${firstSection.title_eng}`
        },
        redirect: {
            permament: false,
            destination: `/${firstSection.title_eng}`
        }
    }
}
export default function Home({path}) {
  return (
      <MainLayout title={'Головна'}>
          home
      </MainLayout>
  )
}
