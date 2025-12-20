import { BrowserRouter, Routes, Route, Outlet, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Dashboard Pages
import { Overview } from './pages/dashboard/Overview.tsx';
import { Settings } from './pages/dashboard/Settings.tsx';

// Public Pages
import { Demo } from './pages/public/Demo';
import { DemoLanding } from './pages/public/DemoLanding';
import { DemoTest } from './pages/public/DemoTest';
import { Signup } from './pages/public/Signup';
import { ForgotPassword } from './pages/public/ForgotPassword';
import { AuditorPortal } from './pages/auditor/AuditorPortal';
import { Home } from './pages/public/Home';
import { Features } from './pages/public/Features';
import { Pricing } from './pages/public/Pricing';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { Login } from './pages/public/Login';
import { PublicLayout } from './components/layout/PublicLayout';
import { Terms } from './pages/public/Terms';
import { Privacy } from './pages/public/Privacy';

// Admin Portal Pages
import { GlobalOverview } from './pages/admin/GlobalOverview';
import { CSVImport } from './pages/admin/CSVImport';
import { Organizations } from './pages/admin/Organizations';
import { Collections } from './pages/admin/Collections';

// Organization Admin Portal
import { OrgAdminDashboard } from './pages/organization/OrgAdminDashboard';
import { Reports } from './pages/organization/Reports';

// Collector Portal Pages
import { FieldCollection } from './pages/collector/FieldCollection';
import { DepositWithdrawal } from './pages/collector/DepositWithdrawal';

// Client Portal Pages
import { ClientPortal } from './pages/client/ClientPortal';
import { ReceiptVerification } from './pages/client/ReceiptVerification';

// Supervisor Portal Pages
import { SupervisorPortal } from './pages/supervisor/SupervisorPortal';
import { Agents } from './pages/supervisor/Agents';


// Layout for the Protected App (Dashboard)
function DashboardLayout() {
  return (
    <div className="flex h-screen w-full bg-brand-dustGold font-sans text-brand-dark">
      <Sidebar className="hidden lg:flex shrink-0 z-20" />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-brand-dustGold">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

// Demo Access Wrapper Component
function DemoAccessWrapper({ children, role }: { children: React.ReactNode; role: string }) {
  const { setDemoUser } = useAuth();
  const [searchParams] = useSearchParams();

  // Set demo user on mount if not already authenticated
  useEffect(() => {
    const orgName = searchParams.get('org') || 'Demo Organization';
    setDemoUser(orgName, role as any);
  }, [setDemoUser, role, searchParams]);

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/demo-landing" element={<DemoLanding />} />
            <Route path="/demo-test" element={<DemoTest />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Demo Routes - Allow access without authentication */}
          <Route path="/demo-admin" element={<DemoAccessWrapper role="admin"><DashboardLayout /></DemoAccessWrapper>}>
            <Route index element={<ProtectedRoute requiredRole="admin"><GlobalOverview /></ProtectedRoute>} />
            <Route path="csv-import" element={<ProtectedRoute requiredRole="admin"><CSVImport /></ProtectedRoute>} />
            <Route path="organizations" element={<ProtectedRoute requiredRole="admin"><Organizations /></ProtectedRoute>} />
            <Route path="collections" element={<ProtectedRoute requiredRole="admin"><Collections /></ProtectedRoute>} />
          </Route>

          <Route path="/demo-organization" element={<DemoAccessWrapper role="organization"><DashboardLayout /></DemoAccessWrapper>}>
            <Route index element={<ProtectedRoute requiredRole="organization"><OrgAdminDashboard /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute requiredRole="organization"><Reports /></ProtectedRoute>} />
          </Route>

          <Route path="/demo-supervisor" element={<DemoAccessWrapper role="supervisor"><DashboardLayout /></DemoAccessWrapper>}>
            <Route index element={<ProtectedRoute requiredRole="supervisor"><SupervisorPortal /></ProtectedRoute>} />
            <Route path="agents" element={<ProtectedRoute requiredRole="supervisor"><Agents /></ProtectedRoute>} />
          </Route>

          <Route path="/demo-collector" element={<DemoAccessWrapper role="collector"><FieldCollection /></DemoAccessWrapper>} />
          <Route path="/demo-collector/deposits" element={<DemoAccessWrapper role="collector"><DashboardLayout /></DemoAccessWrapper>}>
            <Route index element={<ProtectedRoute requiredRole="collector"><DepositWithdrawal /></ProtectedRoute>} />
          </Route>

          <Route path="/demo-client" element={<DemoAccessWrapper role="client"><ClientPortal /></DemoAccessWrapper>} />
          <Route path="/demo-client/verify" element={<DemoAccessWrapper role="client"><ReceiptVerification /></DemoAccessWrapper>} />

          <Route path="/demo-auditor" element={<DemoAccessWrapper role="auditor"><AuditorPortal /></DemoAccessWrapper>} />

          {/* System Admin Portal */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requiredRole="admin"><GlobalOverview /></ProtectedRoute>} />
            <Route path="csv-import" element={<ProtectedRoute requiredRole="admin"><CSVImport /></ProtectedRoute>} />
            <Route path="organizations" element={<ProtectedRoute requiredRole="admin"><Organizations /></ProtectedRoute>} />
            <Route path="collections" element={<ProtectedRoute requiredRole="admin"><Collections /></ProtectedRoute>} />
          </Route>

          {/* Organization Admin Portal */}
          <Route path="/organization" element={<ProtectedRoute requiredRole="organization"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requiredRole="organization"><OrgAdminDashboard /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute requiredRole="organization"><Reports /></ProtectedRoute>} />
          </Route>

          {/* Collector Portal */}
          <Route path="/collector" element={<ProtectedRoute requiredRole="collector"><FieldCollection /></ProtectedRoute>} />
          <Route path="/collector/deposits" element={<ProtectedRoute requiredRole="collector"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requiredRole="collector"><DepositWithdrawal /></ProtectedRoute>} />
          </Route>

          {/* Protected Organization Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Overview />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* Auditor Portal */}
          <Route path="/auditor" element={<ProtectedRoute requiredRole="auditor"><AuditorPortal /></ProtectedRoute>} />

          {/* Client Portal */}
          <Route path="/client" element={<ProtectedRoute requiredRole="client"><ClientPortal /></ProtectedRoute>} />
          <Route path="/client/verify" element={<ProtectedRoute requiredRole="client"><ReceiptVerification /></ProtectedRoute>} />

          {/* Supervisor Portal */}
          <Route path="/supervisor" element={<ProtectedRoute requiredRole="supervisor"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute requiredRole="supervisor"><SupervisorPortal /></ProtectedRoute>} />
            <Route path="agents" element={<ProtectedRoute requiredRole="supervisor"><Agents /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
