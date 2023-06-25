import styles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';



function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={`${styles.buttons} pl-5 pr-5 mr-2 pb-4 pt-4`}>
                    <BurgerIcon type="primary"/>
                    <p className="text text_type_main-default ml-2">Конструктор</p>
                </div>
                <div className={`${styles.buttons} pl-5 pr-5 pb-4 pt-4`}>
                    <ListIcon type="primary"/>
                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                </div>
            </div>
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={`${styles.right} pl-5 pr-5 pb-4 pt-4`}>
                <ProfileIcon type="primary" />
                <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </div>
        </header>
    );
}

export default AppHeader;