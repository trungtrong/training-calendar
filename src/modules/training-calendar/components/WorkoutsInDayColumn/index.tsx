// TODO: Fix Path issue
import { memo, useCallback, useEffect, useState } from 'react';
import { SvgAddButton } from '../../../../assets/svg-icons';
import { ICommonProps } from '../../../../shared/models';
import { Button } from '../../../../theme/components';
import WorkoutItem from '../WorkoutItem';
import styles from './index.module.css';
import {
    DayModel,
    WorkoutByDayModel,
    WorkoutsInDayViewModel,
} from '../../models';
import { DateHelper } from '../../../../helpers';

// Refer to: https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/Sortable/Customization/MaterialBlueLight/
import { Sortable } from 'devextreme-react/sortable';
import { AddEvent, ReorderEvent } from 'devextreme/ui/sortable';

interface IWorkoutsInDayColumnProps extends ICommonProps {
    isInit: boolean;
    dayName: string;
    date: string;
    workoutsInDay: WorkoutsInDayViewModel;
    //
    onDroppedToAnotherDay: (params: {
        fromDay: DayModel;
        toDay: DayModel;
        fromIndex: number;
        toIndex: number;
    }) => void;
    onReorderedOnSameDay: (params: {
        day: DayModel;
        fromIndex: number;
        toIndex: number;
    }) => void;
    onExerciseDroppedToAnotherWorkout: (params: {
        fromWorkout: WorkoutByDayModel;
        toWorkout: WorkoutByDayModel;
        fromIndex: number;
        toIndex: number;
    }) => void;
    onExerciseReorderedOnSameWorkout: (params: {
        workout: WorkoutByDayModel;
        fromIndex: number;
        toIndex: number;
    }) => void;
}

const WorkoutsInDayColumn = (props: IWorkoutsInDayColumnProps) => {
    const {
        isInit,
        dayName,
        date,
        workoutsInDay,
        onDroppedToAnotherDay,
        onReorderedOnSameDay,
        onExerciseDroppedToAnotherWorkout,
        onExerciseReorderedOnSameWorkout
    } = props;

    const [workoutsInDayCloned, setWorkoutsInDayCloned] =
        useState(workoutsInDay);
    const [isCurrentDate, setIsCurrentDate] = useState(false);
    const [dateNumber, setDateNumber] = useState(0);

    //#region Init Data
    useEffect(() => {
        if (isInit) {
            setWorkoutsInDayCloned(() => {
                return structuredClone(workoutsInDay);
            });
        }
    }, [workoutsInDay, isInit]);

    useEffect(() => {
        setDateNumber(() => {
            return new Date(date).getDate();
        });
        //
        const currentDate = new Date();
        setIsCurrentDate(() => {
            return DateHelper.isSameDate({
                firstDate: currentDate,
                secondDate: new Date(date),
            });
        });
    }, [date]);
    //#endregion

    //#region Sortable
    const handleWorkoutReorderedOnSameDay = useCallback(
        (params: ReorderEvent) => {
            const fromData = params.fromData as DayModel;
            const toData = params.toData as DayModel;
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
            //
            onReorderedOnSameDay({
                day: fromData,
                fromIndex: params.fromIndex,
                toIndex: params.toIndex,
            });
        },
        [onReorderedOnSameDay]
    );

    const handleWorkoutDroppedToAnotherDay = useCallback(
        (params: AddEvent) => {
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
            onDroppedToAnotherDay({
                fromDay: params.fromData as DayModel,
                toDay: params.toData as DayModel,
                fromIndex: params.fromIndex,
                toIndex: params.toIndex,
            });
        },
        [onDroppedToAnotherDay]
    );
    //#endregion

    return (
        <div className={styles['kanban-column-container']}>
            {/* Day Name */}
            <div className={`${styles['kanban-column__day']} truncate`}>
                {dayName}
            </div>
            {/* Kanban Column */}
            <div className={styles['kanban-column__workout-list-container']}>
                <div className={styles['workout-list__header']}>
                    {/* TODO: Fix title for date */}
                    <div
                        className={`${styles['kanban-column__date']} truncate `}
                        data-current-date={isCurrentDate}
                        title={date ?? null}
                    >
                        {dateNumber ?? '-'}
                    </div>
                    <Button title="Add Workout">
                        <SvgAddButton width={13} color={'#A0A8B1'} />
                    </Button>
                </div>

                {/* Workout List */}
                <div className={styles['kanban-column__workout-list']}>
                    <Sortable
                        className={styles['kanban-column__sortable-wrapper']}
                        group="workoutsGroup"
                        data={{
                            date: date,
                            dayName: dayName,
                        }}
                        dropFeedbackMode={'indicate'}
                        onReorder={handleWorkoutReorderedOnSameDay}
                        onAdd={handleWorkoutDroppedToAnotherDay}
                    >
                        {workoutsInDayCloned?.workouts?.length > 0 ? (
                            workoutsInDayCloned?.workouts.map((workout) => {
                                return (
                                    <WorkoutItem
                                        key={workout.id}
                                        workout={workout}
                                        dayName={dayName}
                                        date={date}
                                        onDroppedToAnotherWorkout={onExerciseDroppedToAnotherWorkout}
                                        onReorderedOnSameWorkout={onExerciseReorderedOnSameWorkout}
                                    ></WorkoutItem>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </Sortable>
                </div>
            </div>
        </div>
    );
};

export default memo(WorkoutsInDayColumn);
