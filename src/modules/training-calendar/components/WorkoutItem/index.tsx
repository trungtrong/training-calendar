import { Button } from '../../../../theme/components';
import styles from './index.module.css';
import { SvgThreeDots, SvgAddButton } from '../../../../assets/svg-icons';
import ExerciseItem from '../ExerciseItem';

const WorkoutItem = () => {
    return (
        <div className={styles['workout-wrapper']}>
            {/* Header */}
            <div className={styles['workout-header']}>
                {/* TODO: Add title */}
                <div className={`${styles['workout-name']} truncate`}
                    title={'Chest day - with arm...'}>
                    Chest day - with arm...
                </div>
                {/* 3 dots button */}
                <Button title="Edit Workout">
                    <SvgThreeDots color={'#726EE4'} />
                </Button>
            </div>
            {/* Exercises */}
            <div className={styles['workout__exercise-list']}>
                <ExerciseItem />
                <ExerciseItem />
                <ExerciseItem />
                <ExerciseItem />
                <ExerciseItem />
            </div>

            {/* Add Button */}
            <div className={styles['workout__add-exercise-button']}>
                <Button title="Add Exercise">
                    <SvgAddButton width={13} color={'#A0A8B1'} />
                </Button>
            </div>
        </div>
    );
};

export default WorkoutItem;
