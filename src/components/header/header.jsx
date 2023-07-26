import styles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link, useLocation } from 'react-router-dom';

export const activePaths = {
    'home': [{ path: '/', exact: true }, { path: '/ingredients', exact: false }],
    'ordersFeed': [{ path: '/orders-feed', exact: false }],
    'profile': [{ path: '/profile', exact: false }]
}

function AppHeader() {
    const location = useLocation()

    const isActiveClass = (navName) => {
        let isActive = false;
        activePaths[navName].forEach((pathObj) => {
            if ((pathObj.exact && location.pathname === pathObj.path) || (!pathObj.exact && location.pathname.includes(pathObj.path))) {
                isActive = true;
            }
        })
        return { navClass: isActive ? 'no_style text text_type_main-default' : 'no_style text text_type_main-default text_color_inactive', iconType: isActive ? 'primary' : 'secondary' }
    }

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <NavLink to='/' className={isActiveClass('home').navClass} >
                    <div className={`${styles.buttons} pl-5 pr-5 mr-2 pb-4 pt-4`}>
                        <BurgerIcon type={isActiveClass('home').iconType} />
                        <p className={`${styles.no_style} ml-2`}>Конструктор</p>
                    </div>
                </NavLink>
                <NavLink to='/orders-feed' className={isActiveClass('ordersFeed').navClass}>
                    <div className={`${styles.buttons} pl-5 pr-5 pb-4 pt-4`}>
                        <ListIcon type={isActiveClass('ordersFeed').iconType} />
                        <p className='ml-2'>Лента заказов</p>
                    </div>
                </NavLink>
            </div>
            <div className={styles.logo}>
                <Link to='/'><Logo /></Link>
            </div>
            <div className={`${styles.right} pl-5 pr-5 pb-4 pt-4`}>
                <NavLink to='/profile' className={isActiveClass('profile').navClass} >
                    <div className={styles.buttons}>
                        <ProfileIcon type={isActiveClass('profile').iconType} />
                        <p className='ml-2'>Личный кабинет</p>
                    </div>
                </NavLink>
            </div>
        </header>
    );
}

export default AppHeader;