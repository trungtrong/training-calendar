import { lazy, Suspense } from 'react';
import styles from './App.module.css';

const TrainingCalendar = lazy(() => import('./modules/training-calendar/training-calendar'));

const App = () => {
    return (
        <Suspense fallback={<div className={styles['loading-container']}>Loading...</div>}>
            <TrainingCalendar />
        </Suspense>
    );
};

export default App;
