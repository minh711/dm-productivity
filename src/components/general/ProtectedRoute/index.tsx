import React from 'react';
import useSession from '../../../hooks/useSession';
import UnauthorizedPage from '../../../pages/UnauthorizedPage';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  layout: React.ComponentType<any> | null;
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  layout: Layout,
  roles: roles,
}) => {
  const { accessToken, role } = useSession();

  if (!accessToken || !roles.includes(role)) {
    return <UnauthorizedPage />;
  }

  return Layout ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Component />
  );
};

export default ProtectedRoute;
