import { memo } from 'react';
import styles from './index.module.css';
import { ExerciseViewModel } from '../../models';
import { ICommonProps } from '../../../../shared/models';

interface IExerciseItemProps extends ICommonProps {
    exercise: ExerciseViewModel;
}


const ExerciseItem = (props: IExerciseItemProps) => {
    const { exercise } = props;

    return (
        <div className={styles['exercise-wrapper']}>
            {/* Name */}
            {/* TODO: Add title */}
            <div
                className={`${styles['exercise-name']} truncate`}
                title={exercise.name}
            >
                { exercise.name }
            </div>
            <div className={styles['exercise-info-container']}>
                <div className={`${styles['exercise__number-of-set']}`}>3x</div>
                {/* TODO: Add title */}
                <div className={`${styles['exercise-info']} truncate`}
                     title={'50 lb x 5, 60 lb x 5, 70 l...'}>
                    50 lb x 5, 60 lb x 5, 70 l...
                </div>
            </div>
        </div>
    );
};

export default memo(ExerciseItem);
