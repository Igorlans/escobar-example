import React, {useEffect, useState} from 'react';
import classes from './login.module.scss';
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/useAuth";
import {useLoading} from "@/context/useLoading";
import cookie from 'js-cookie';
const Login = () => {
    // const isAuth = useSelector(state => state.user.isAuth);

    const {isAuth, setAuth, setUserId} = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const {setLoading} = useLoading()

    const submitHandler = async () => {
        // dispatch(login(email, password));
        try {
            setLoading(true)
            const res = await fetch(`/api/auth`, {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const json = await res.json()
            // console.log(json)
            if (!res.ok) {
               throw new Error(json.message);
            }
            setAuth(true);
            setUserId(json.userId)
            cookie.set('isAuth', "true", {expires: 1/24})
            router.push('/adminpanel/products');
            setLoading(false)
        } catch (e) {
            console.log(e.message)
            setLoading(false)
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const cookiesAuth = cookie.get('isAuth')
        if (cookiesAuth === 'true') {
            setAuth(true)
        }
    }, [])

    useEffect(() => {
        if (isAuth) {
            router.push('/adminpanel/products')
        }
    }, [isAuth])
    return (
        <div className={classes.login} >
            <div className={classes.login__body}>
                <div className={classes.login__title}>Вхід</div>
                <div className={classes.login__form}>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Введіть email..." type="email" className="login__input" />
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Введіть пароль..." type="password" className="login__input" />
                    <button onClick={submitHandler} className={classes.login__submit}>Увійти</button>
                </div>
            </div>
        </div>
    );
};

export default Login;