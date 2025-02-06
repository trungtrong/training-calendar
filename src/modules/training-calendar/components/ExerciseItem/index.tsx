import { memo } from 'react';
//
import styles from './index.module.css';
import { ExerciseViewModel } from '../../models';
import { ICommonProps } from '@/shared/models';

interface IExerciseItemProps extends ICommonProps {
    exercise: ExerciseViewModel;
}

const ExerciseItem = (props: IExerciseItemProps) => {
    const { exercise } = props;

    return (
        <div className={styles['exercise-wrapper']}>
            <div
                className={`${styles['exercise-name']} truncate`}
                title={exercise?.name ?? null}
            >
                { exercise?.name ?? '-'}
            </div>
            <div className={styles['exercise-info-container']}>
                <div className={`${styles['exercise__number-of-set']}`}>{exercise?.numberOfSet ?? 0}x</div>
                <div className={`${styles['exercise-info']} truncate`}
                     title={exercise?.info ?? null}>
                    {exercise?.info ?? '-'}
                </div>
            </div>
        </div>
    );
};

export default memo(ExerciseItem);
