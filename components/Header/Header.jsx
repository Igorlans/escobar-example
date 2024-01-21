import { AiOutlineDollarCircle } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import classes from './header.module.scss';
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/useAuth";
import cookie from "js-cookie";

const Header = ({title = 'Меню'}) => {
    const router = useRouter();
    const {isAuth, setAuth, setUserId} = useAuth()

    const logout = () => {
        setAuth(false);
        setUserId(null);
        cookie.remove('isAuth');
    }

    return (
        <div className={classes.header}>
            <div className={classes.header__logo}>{title}</div>
            {title === 'Меню'
                ? <a href="#" className={classes.header__cart}><AiOutlineDollarCircle size="1.9em" /></a>
                :
                isAuth
                    ? <button onClick={logout} className={classes.header__logout}><MdLogout size="1.4em" /></button>
                    : <button style={{fontSize: "16px"}} onClick={() => router.push("/")} className={classes.header__logout}>Назад</button>
            }
        </div>
    );
};

export default Header;