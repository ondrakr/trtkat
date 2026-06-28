import { Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from './AdminAuthContext';
import { AdminLayout } from './AdminLayout';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminDashboardPage } from './AdminDashboardPage';
import { AdminPostsPage } from './AdminPostsPage';
import { AdminPostEditPage } from './AdminPostEditPage';
import { AdminWaitlistPage } from './AdminWaitlistPage';
import { AdminCookiesPage } from './AdminCookiesPage';

export function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="clanky" element={<AdminPostsPage />} />
          <Route path="clanky/:id" element={<AdminPostEditPage />} />
          <Route path="waitlist" element={<AdminWaitlistPage />} />
          <Route path="cookies" element={<AdminCookiesPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
