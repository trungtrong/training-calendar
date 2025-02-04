import styles from './index.module.css';
import { WorkoutDayContainer } from './components';
import { DAYS } from './constants';

const TrainingCalendar = () => {
    return (
        <div className={styles['training-calendar-wrapper']}>
            {/* Layout */}
            <div className={styles['training-calendar-kanban-container']}>
                {DAYS.map((day, index) => (
                    <WorkoutDayContainer 
                        key={index} 
                        day={day}/>
                ))}
            </div>
        </div>
    );
};

export default TrainingCalendar;
