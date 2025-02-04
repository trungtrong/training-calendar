import { lazy, Suspense } from 'react';
import './App.css';

const TrainingCalendar = lazy(() => import('./modules/training-calendar/training-calendar'));

const App = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <TrainingCalendar />
        </Suspense>
    );
};

export default App;
