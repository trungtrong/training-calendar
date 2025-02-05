import { Sortable } from 'devextreme-react';
import { AddEvent, ReorderEvent } from 'devextreme/ui/sortable';
//
import { Button } from '../../../../theme/components';
import styles from './index.module.css';
import { SvgThreeDots, SvgAddButton } from '../../../../assets/svg-icons';
import ExerciseItem from '../ExerciseItem';
import { memo, useCallback, useEffect, useState } from 'react';
import { ICommonProps } from '../../../../shared/models';
import { WorkoutByDayModel, WorkoutViewModel } from '../../models';

interface IWorkoutItemProps extends ICommonProps {
    dayName: string;
    date: string;
    workout: WorkoutViewModel;
    onDroppedToAnotherWorkout: (params: {
        fromWorkout: WorkoutByDayModel;
        toWorkout: WorkoutByDayModel;
        fromIndex: number;
        toIndex: number;
    }) => void;
    onReorderedOnSameWorkout: (params: {
        workout: WorkoutByDayModel;
        fromIndex: number;
        toIndex: number;
    }) => void;
}

const WorkoutItem = (props: IWorkoutItemProps) => {
    const { dayName, date, workout, onDroppedToAnotherWorkout, onReorderedOnSameWorkout } = props;
    const [workoutCloned, setWorkoutCloned] = useState(workout);

    useEffect(() => {
        setWorkoutCloned(() => {
            return structuredClone(workout);
        });
    }, [workout]);

    //#region Sortable
    const handleExerciseReordered = useCallback((params: ReorderEvent) => {
        const fromData = params.fromData as WorkoutByDayModel;
        const toData = params.toData as WorkoutByDayModel;
        // Check same fromDa and ToData -> ignore
        if (
            !params ||
            !fromData ||
            !toData ||
            params.fromIndex < 0 ||
            params.toIndex < 0
        ) {
            return;
        }
        // Check if it doesn't reorder or just order on its own position
        if (
            fromData.date !== toData.date ||
            params.fromIndex === params.toIndex
        ) {
            return;
        }
        onReorderedOnSameWorkout({
            workout: fromData,
            fromIndex: params.fromIndex,
            toIndex: params.toIndex,
        })
    }, []);

    const handleExerciseDropped = useCallback((params: AddEvent) => {
        if (
            !params ||
            !params.fromData ||
            !params.toData ||
            params.fromIndex < 0 ||
            params.toIndex < 0
        ) {
            return;
        }
        //
        onDroppedToAnotherWorkout({
            fromWorkout: params.fromData as WorkoutByDayModel,
            toWorkout: params.toData as WorkoutByDayModel,
            fromIndex: params.fromIndex,
            toIndex: params.toIndex,
        });
    }, [onDroppedToAnotherWorkout]);
    //#endregion

    return (
        <div className={styles['workout-wrapper']}>
            {/* Header */}
            <div className={styles['workout-header']}>
                <div
                    className={`${styles['workout-name']} truncate`}
                    title={workoutCloned.name}
                >
                    {workoutCloned.name}
                </div>
                {/* 3 dots button */}
                <Button title="Edit Workout">
                    <SvgThreeDots color={'#726EE4'} />
                </Button>
            </div>
            {/* Exercises */}
            <div className={styles['workout__exercise-list']}>
                <Sortable
                    className={`${styles['exercise-list__sortable-wrapper']}`}
                    elementAttr={{
                        'data-is-empty': !workoutCloned?.exercises?.length
                    }}
                    group="exercisesGroup"
                    data={{
                        date: date,
                        dayName: dayName,
                        workoutId: workoutCloned?.id,
                    }}
                    dropFeedbackMode={'indicate'}
                    onReorder={handleExerciseReordered}
                    onAdd={handleExerciseDropped}
                >
                    {workoutCloned?.exercises?.length > 0 ? (
                        workoutCloned.exercises.map((exercise) => {
                            return (
                                <ExerciseItem
                                    key={exercise.id}
                                    exercise={exercise}
                                ></ExerciseItem>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </Sortable>
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
