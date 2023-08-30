import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../services/auth-thunk/auth-thunk'
import { useAppDispatch } from '../utils/hooks';

export function ProfilePage() {

    const dispatch = useAppDispatch()

    const handleLogoutClick = () => {
        dispatch(logoutThunk())
    }

    return (
        <div className={styles.container + ' mt-20'}>
            <div className='text text_type_main-medium'>
                <div className={styles.menu_item}><NavLink end to='/profile' className={({isActive}) => `${styles.link} ${isActive ? styles.link_active : ""}`}>Профиль</NavLink></div>
                <div className={styles.menu_item}><NavLink className={({isActive}) => `${styles.link} ${isActive ? styles.link_active : ""}`} to='/profile/orders'>История заказов</NavLink></div>
                <div className={styles.menu_item}><div className={styles.button + ' text_color_inactive'} onClick={handleLogoutClick}>Выход</div></div>
                <div className='mt-20 text text_type_main-small text_color_inactive'>
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </div>
            <Outlet />
        </div>
    )
}