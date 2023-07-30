import styles from './login.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk } from '../services/auth-thunk/auth-thunk';

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.authReducer);
    const returnUrl = useSelector(store => store.returnUrlReducer.url)

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return
        }
        dispatch(signInThunk({ email, password }))
    }

    if (user) {
        return returnUrl ? <Navigate to={returnUrl} replace /> : <Navigate to="/" replace />
    }

    return (
        <div className= {`${styles.container} mt-20`}>
            <div className='text text_type_main-large'>Вход</div>
            <form onSubmit={handleLoginSubmit}>
                <div className={styles.wrapper}>
                    <div className='mt-6'>
                        <Input
                            placeholder={'E-mail'}
                            type={'email'}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            size={'default'}
                        />
                    </div>
                    <div className='mt-6'>
                        <PasswordInput
                            placeholder={'Пароль'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mt-6'>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                        >
                            Войти
                        </Button>
                    </div>
                </div>
            </form>
            <div className={styles.text_block + ' mt-20'}>
                <div className='text text_type_main-small text_color_inactive'>Вы - новый пользователь?</div>
                <div className={styles.link + ' ml-1 text text_type_main-small'}><Link className="no_style" to='/register'>Зарегистрироваться</Link></div>
            </div>
            <div className={styles.text_block + ' mt-4'}>
                <div className='text text_type_main-small text_color_inactive'>Забыли пароль?</div>
                <div className={styles.link + ' ml-1 text text_type_main-small'}><Link className="no_style" to='/forgot-password'>Восстановить пароль</Link></div>
            </div>
        </div>
    )
}