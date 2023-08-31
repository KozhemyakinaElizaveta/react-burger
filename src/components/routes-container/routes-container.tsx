import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, ProfileOrdersPage, ProfileAccountPage, IngredientModal, NotFound404, ProfileOrderPage, FeedOrderPage, FeedPage, ProfileOrderModal, FeedOrderModal } from '../../pages'
import { useDispatch } from 'react-redux'
import { addReturnUrl } from '../../services/actions/auth-action'
import { FunctionComponent, useEffect, useState } from 'react'
import { getAuth } from '../../services/store';
import { useAppSelector } from '../../utils/hooks';

type TProtectedRouteElement = {
    element: JSX.Element;
}

const ProtectedRouteElement: FunctionComponent<TProtectedRouteElement> = ({ element }) => {
    const { user, getUser } = useAppSelector(getAuth);
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
    const locationState = location.state as {background?: Location };
    const background = locationState && locationState.background;
    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path='/feed' element={<FeedPage />} />
                <Route path='/feed/:id' element={<FeedOrderPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
                    <Route path="" element={<ProfileAccountPage />} />
                    <Route path="orders" element={<ProfileOrdersPage />} />
                </Route>
                <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<ProfileOrderPage />} />}></Route>
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
            {background && <Routes>
                <Route path="ingredients/:id" element={<IngredientModal />} />
                <Route path="/feed/:id" element={<FeedOrderModal />} />
                <Route path="/profile/orders/:id" element={<ProfileOrderModal />} />
            </Routes>}
        </>
    )
}