import { Navigate } from 'react-router-dom';

export function Demo() {
    // Redirect to the new demo landing page
    return <Navigate to="/demo-landing" replace />;
}
