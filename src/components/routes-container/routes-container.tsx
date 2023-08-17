import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, ProfileOrdersPage, ProfileAccountPage, IngredientModal, NotFound404, OrdersFeedPage } from '../../pages'
import { useSelector, useDispatch } from 'react-redux'
import { addReturnUrl } from '../../services/actions/auth-action.jsx'
import { useEffect, useState } from 'react'

function ProtectedRouteElement({ element }) {
    const { user, getUser } = useSelector(store => store.authReducer);
    const [userNotLoaded, setUserNotLoaded] = useState(true)
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addReturnUrl(location.pathname))
        setUserNotLoaded(false)
    }, [])

    if (userNotLoaded || getUser) {
        return null;
    } else {
        return user ? element : <Navigate to="/login" replace />;
    }
}

export default function RoutesContainer() {
    const location = useLocation();
    const locationState = location.state as {background?: Location }
    const background = locationState && locationState.background;
    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path='/orders-feed' element={<OrdersFeedPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
                    <Route path="" element={<ProfileAccountPage />} />
                    <Route path="orders" element={<ProfileOrdersPage />} />
                </Route>
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
            {background && <Routes>
                <Route path="ingredients/:id" element={<IngredientModal />} />
            </Routes>}

        </>
    )
}