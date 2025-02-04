import { Button } from '../../../../theme/components';
import styles from './index.module.css';
import { SvgThreeDots, SvgAddButton } from '../../../../assets/svg-icons';
import ExerciseItem from '../ExerciseItem';
import { memo } from 'react';
import { ICommonProps } from '../../../../shared/models';
import { WorkoutViewModel } from '../../models';

interface IWorkoutItemProps extends ICommonProps {
    workout: WorkoutViewModel;
}

const WorkoutItem = (props: IWorkoutItemProps) => {
    const { workout } = props;

    return (
        <div className={styles['workout-wrapper']}>
            {/* Header */}
            <div className={styles['workout-header']}>
                <div
                    className={`${styles['workout-name']} truncate`}
                    title={workout.name}
                >
                    {workout.name}
                </div>
                {/* 3 dots button */}
                <Button title="Edit Workout">
                    <SvgThreeDots color={'#726EE4'} />
                </Button>
            </div>
            {/* Exercises */}
            <div className={styles['workout__exercise-list']}>
                {workout?.exercises?.length > 0 ? (
                    workout.exercises.map((exercise, exerciseIndex) => {
                        return (
                            <ExerciseItem
                                key={exerciseIndex}
                                exercise={exercise}
                            ></ExerciseItem>
                        );
                    })
                ) : (
                    <></>
                )}
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

export default memo(WorkoutItem);
