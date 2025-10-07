import { CustomerOrderScreen } from '@/screen/order/CustomerOrderScreen';
import { Suspense } from 'react';

export default function PublicOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <CustomerOrderScreen />
    </Suspense>
  );
}
