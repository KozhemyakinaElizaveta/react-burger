import styles from './register.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { registerThunk } from '../services/auth-thunk/auth-thunk'
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getAuth } from '../services/store';

export function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const { user, getUser } = useAppSelector(getAuth);

    const handleRegisterSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!name || !email || !password) {
            return
        }
        dispatch(registerThunk({ name, email, password }))
    }
    if (getUser) {
        return null;
    }
    if (user) {
        return <Navigate to="/" replace />
    }

    return (
        <div className= {`${styles.container} mt-20`}>
            <div className='text text_type_main-large'>Регистрация</div>
            <form onSubmit={handleRegisterSubmit}>
                <div className={styles.wrapper}>
                    <div className='mt-6'>
                        <Input
                            placeholder={'Имя'}
                            type={'text'}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            size={'default'}
                        />
                    </div>
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
                            Зарегистрироваться
                        </Button>
                    </div>
                </div>
            </form>
            <div className={styles.text_block + ' mt-20'}>
                <div className='text text_type_main-small text_color_inactive'>Уже зарегистрированы?</div>
                <div className={styles.link + ' ml-1 text text_type_main-small'}><Link className="no_style" to='/login'>Войти</Link></div>
            </div>
        </div>
    )
}