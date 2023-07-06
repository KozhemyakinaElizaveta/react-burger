import styles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';



function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <a className={`${styles.buttons} pl-5 pr-5 mr-2 pb-4 pt-4`}>
                    <BurgerIcon type="primary"/>
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </a>
                <a className={`${styles.buttons} pl-5 pr-5 pb-4 pt-4`}>
                    <ListIcon type="secondary"/>
                    <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                </a>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <a className={`${styles.right} pl-5 pr-5 pb-4 pt-4`}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
            </a>
        </header>
    );
}

export default AppHeader;