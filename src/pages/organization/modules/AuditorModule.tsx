import { Card, CardContent } from '../../../components/ui/Card';
import { Shield } from 'lucide-react';

export function AuditorModule() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto p-4'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900'>Audit Rules</h1>
          <p className='text-gray-600'>Compliance and regulatory monitoring</p>
        </div>

        {/* Content */}
        <Card>
          <CardContent className='p-8 text-center'>
            <Shield className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Audit Module</h3>
            <p className='text-gray-600 mb-4'>Regulatory compliance and audit trail management</p>
            <p className='text-sm text-gray-500'>This module is under development</p>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className='border-t border-gray-200 bg-gray-50 px-4 py-6 mt-8'>
          <div className='text-center'>
            <p className='text-xs text-gray-500 font-medium'>
              Powered by Altonixa Group Ltd • Audit Rules
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
