// TODO: Fix Path issue
import { SvgAddButton } from '../../../../assets/svg-icons/add-button.svg';
import { Button } from '../../../../theme/components';
import WorkoutItem from '../WorkoutItem';
import styles from './index.module.css';

const WorkoutDayContainer = () => {
    return (
        <div className={styles['kanban-column-container']}>
            {/* Day Name */}
            <div className={`${ styles['kanban-column__day'] } truncate`}>MON</div>
            {/* Kanban Column */}
            <div className={styles['kanban-column__workout-list-container']}>
                <div className={styles['workout-list__header']}>
                    {/* TODO: Add title for date */}
                    <div className={`${ styles['kanban-column__date'] } truncate`}>6</div>
                    <Button title='Add Workout'>
                        <SvgAddButton 
                            width={13}
                            color={'#A0A8B1'}/>
                    </Button>
                </div>

                {/* Workout List */}
                <div className={styles['kanban-column__workout-list']}>
                    <WorkoutItem></WorkoutItem>
                </div>
            </div>
        </div>
    );
};

export default WorkoutDayContainer;
