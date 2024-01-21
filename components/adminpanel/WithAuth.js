import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {useAuth} from "@/context/useAuth";
import cookie from "js-cookie";
export default function withAuth(WrappedComponent) {
    return function Authenticated(props) {
        const router = useRouter();
        const {isAuth, setAuth} = useAuth();


        useEffect(() => {
            const cookiesAuth = cookie.get('isAuth')
            if (cookiesAuth === 'true') {
                setAuth(true)
                return;
            }
            if (!isAuth) {
                router.push('/adminpanel')
            }
        }, [isAuth]);

        return <WrappedComponent {...props} />;
    }
}
