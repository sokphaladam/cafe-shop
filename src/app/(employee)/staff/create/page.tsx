import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { CreateUserScreen } from '@/screen/user/CreateUserScreen';
import { UserListScreen } from '@/screen/user/UserListScreen';

export default function CreateStaffPage() {
  return (
    <PolarisLayout
      title="Create Staff"
      fullWidth={false}
      // primaryAction={{ content: 'Create', url: '/staff/create' }}
    >
      <CreateUserScreen />
    </PolarisLayout>
  );
}
