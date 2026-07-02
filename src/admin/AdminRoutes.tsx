import { Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from './AdminAuthContext';
import { AdminLayout } from './AdminLayout';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminDashboardPage } from './AdminDashboardPage';
import { AdminPostsPage } from './AdminPostsPage';
import { AdminPostEditPage } from './AdminPostEditPage';
import { AdminWaitlistPage } from './AdminWaitlistPage';
import { AdminCookiesPage } from './AdminCookiesPage';
import { AdminReportsPage } from './AdminReportsPage';
import { AdminReportDetailPage } from './AdminReportDetailPage';
import { AdminChildSafetyPage } from './AdminChildSafetyPage';
import { AdminGdprPage } from './AdminGdprPage';
import { AdminAppealsPage } from './AdminAppealsPage';
import { AdminSupportPage } from './AdminSupportPage';
import { AdminAuditPage } from './AdminAuditPage';

export function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="reporty" element={<AdminReportsPage />} />
          <Route path="reporty/:id" element={<AdminReportDetailPage />} />
          <Route path="child-safety" element={<AdminChildSafetyPage />} />
          <Route path="gdpr" element={<AdminGdprPage />} />
          <Route path="odvolani" element={<AdminAppealsPage />} />
          <Route path="support" element={<AdminSupportPage />} />
          <Route path="audit" element={<AdminAuditPage />} />
          <Route path="clanky" element={<AdminPostsPage />} />
          <Route path="clanky/:id" element={<AdminPostEditPage />} />
          <Route path="waitlist" element={<AdminWaitlistPage />} />
          <Route path="cookies" element={<AdminCookiesPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
