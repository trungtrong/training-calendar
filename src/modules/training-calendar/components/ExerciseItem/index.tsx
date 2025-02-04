import styles from './index.module.css';

const ExerciseItem = () => {
    return (
        <div className={styles['exercise-wrapper']}>
            {/* Name */}
            {/* TODO: Add title */}
            <div
                className={`${styles['exercise-name']} truncate`}
                title={'Bench Press Med...'}
            >
                Bench Press Med...
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

export default ExerciseItem;
