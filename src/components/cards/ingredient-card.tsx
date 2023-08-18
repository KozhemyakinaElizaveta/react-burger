import { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
    CONSTRUCTOR_CARD,
    MOVE_INGREDIENT,
    removeIngredient,
} from "../../services/actions/constructor-action";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";
import {removeIngredientCounter} from "../../services/actions/ingredients-action";
import { TIngredient } from "../../utils/types";

type TIngredientCard = {
    item: TIngredient,
    index: number
}

export const IngredientCard: FC<TIngredientCard> = ({ item, index }) => {
    const { name, price, image, _id } = item;

    const dispatch = useDispatch();
    const ref = useRef<HTMLInputElement>(null);

    const [{ isDragging }, dragRef] = useDrag({
        type: CONSTRUCTOR_CARD,
        item: () => {
        return { _id, index };
        },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: CONSTRUCTOR_CARD,
        hover: (item, monitor) => {
        if (!ref.current) {
            return;
        }

        //@ts-ignore
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const clientOffset: any = monitor.getClientOffset();
        const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        dispatch({
            type: MOVE_INGREDIENT,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        });

        //@ts-ignore
        item.index = hoverIndex;
        },
    });

    dragRef(dropRef(ref));

    //@ts-ignore
    const onClose = (item, index, _id) => {
        dispatch(removeIngredient(item, index));
        dispatch(removeIngredientCounter(_id));
    };

    return (
        <li
        className={`${styles.listItem} ${isDragging && styles.item_drag}`}
        //@ts-ignore
        ref={ref}
        >
        <div className={styles.points}>
            <DragIcon type={"primary"} />
        </div>
        <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
            handleClose={() => onClose(item, index, _id)}
        />
        </li>
    );
};