import { Suspense } from 'react';
import LiveStandings from '../../components/LiveStandings';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function LiveStandingsPage() {
  return (
    <div className="container mx-auto py-8">
      <ErrorBoundary fallback={<p className="text-center text-red-500">Something went wrong. Please try again later.</p>}>
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <LiveStandings />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}