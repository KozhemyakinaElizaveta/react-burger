import styles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link, useMatch } from 'react-router-dom';

export const activePaths = {
    'home': [{ path: '/', exact: true }, { path: '/ingredients', exact: false }],
    'ordersFeed': [{ path: '/orders-feed', exact: false }],
    'profile': [{ path: '/profile', exact: false }]
}

function AppHeader() {
    const isConstructor = !!useMatch({ path: "/", exact: true });
    const isFeed = !!useMatch("/orders-feed");
    const isProfile = !!useMatch("/profile");

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <NavLink to='/' className={({isActive}) => `${styles.link} ${isActive ? styles.link_active : ""}`} >
                    <div className={`${styles.buttons} pl-5 pr-5 mr-2 pb-4 pt-4`}>
                        <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                        <p className={'text text_type_main-default ml-2'}>Конструктор</p>
                    </div>
                </NavLink>
                <NavLink to='/orders-feed' className={({isActive}) => `${styles.link} ${isActive ? styles.link_active : ""}`}>
                    <div className={`${styles.buttons} pl-5 pr-5 pb-4 pt-4`}>
                        <ListIcon type={isFeed ? "primary" : "secondary"} />
                        <p className='text text_type_main-default ml-2'>Лента заказов</p>
                    </div>
                </NavLink>
            </div>
            <div className={styles.logo}>
                <Link to='/'><Logo /></Link>
            </div>
            <div className={`${styles.right} pl-5 pr-5 pb-4 pt-4`}>
                <NavLink to='/profile' className={({isActive}) => `${styles.link} ${isActive ? styles.link_active : ""}`}>
                    <div className={styles.buttons}>
                        <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                        <p className='text text_type_main-default ml-2'>Личный кабинет</p>
                    </div>
                </NavLink>
            </div>
        </header>
    );
}

export default AppHeader;