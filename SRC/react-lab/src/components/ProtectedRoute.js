import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { path } from '../ultils';

export default function ProtectedRoute({ children, allowedRoles }) { // Added allowedRoles
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    
    if (!auth.isAuthenticated) {
        return <Navigate to={path.LOGIN} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={path.UNAUTHORIZED} replace />;
    }

    return children;
}