import { AppLayout } from '@/components/layout/AppLayout';
import { UserDashboard } from '@/features/users/components/UserDashboard';

function App() {
  return (
    <AppLayout>
      <UserDashboard />
    </AppLayout>
  );
}

export default App;
