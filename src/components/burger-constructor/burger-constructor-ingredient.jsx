import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

const ConstructorIngredient = (props) => (
    <div className={`${styles.element} mt-4 mr-4`}>
        <DragIcon type="primary" />
        <ConstructorElement
            text={props.element.name}
            price={props.element.price}
            thumbnail={props.element.image_mobile}
        />
    </div>
);

export default ConstructorIngredient;