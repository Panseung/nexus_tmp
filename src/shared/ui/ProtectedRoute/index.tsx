import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../app/store';
import { verifyToken } from '../../../shared/api/auth.api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, setUser } = useAuthStore();
  const location = useLocation();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      // 이미 인증된 상태라면 검증하지 않음
      if (isAuthenticated) {
        setIsChecking(false);
        return;
      }

      try {
        const userData = await verifyToken();
        setUser(userData);
      } catch (error) {
        console.error('Token verification failed:', error);
        setUser(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, setUser]);

  if (isChecking) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.2rem',
        }}
      >
        로딩 중...
      </div>
    );
  }

  if (!isAuthenticated) {
    // 로그인 후 원래 페이지로 리다이렉트하기 위해 현재 경로 저장
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
