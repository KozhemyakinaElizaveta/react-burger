import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

function ConstructorBun (props) {
    <div className={`${styles.element_bun} ml-8`}>
        {props.type === 'top' &&
        <ConstructorElement
            type={props.type}
            text={`${props.bun.name} (верх)`} 
            isLocked={true}
            price={props.bun.price}
            thumbnail={props.bun.image_mobile}
        />}
        {props.type === 'bottom' &&
        <ConstructorElement
            type={props.type}
            text={`${props.bun.name} (низ)`} 
            isLocked={true}
            price={props.bun.price}
            thumbnail={props.bun.image_mobile}
        />}
    </div>
}
export default ConstructorBun;