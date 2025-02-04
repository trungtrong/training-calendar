import { useState } from 'react';
import styles from './index.module.css';
import { WorkoutDayContainer } from './components';

const TrainingCalendar = () => {
    const [days] = useState(['Mon', 'Tue', 'Fri', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']);

    return (
        <div className={styles['training-calendar-wrapper']}>
            {/* Layout */}
            <div className={styles['training-calendar-kanban-container']}>
            {
                days.map((day, index) => (
                    <WorkoutDayContainer key={index}/>
                ))
            }
            </div>
        </div>
    );
}

export default TrainingCalendar;
