import Head from "next/head";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import {useLoading} from "@/context/useLoading";
import {Backdrop, CircularProgress} from "@mui/material";
import {useAuth} from "@/context/useAuth";

const navbarLinks = [
    {
        title: 'Продукти',
        title_eng: 'products'
    },
    {
        title: 'Категорії',
        title_eng: 'categories'
    },
    {
        title: 'Розділи',
        title_eng: 'sections'
    },

]
const AdminLayout = ({title = 'Blackbar', children}) => {
    const {loading} = useLoading();
    const {isAuth} = useAuth();
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/*LOADER*/}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 100000}}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="wrapper">
                <Header title={'Адмінпанель'} />
                {isAuth
                    ? <Navbar sections={navbarLinks} />
                    : null
                }
                <main>
                    {children}
                </main>
            </div>
        </>
    );
};

export default AdminLayout;