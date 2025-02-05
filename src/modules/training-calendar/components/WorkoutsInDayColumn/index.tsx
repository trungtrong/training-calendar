// TODO: Fix Path issue
import { memo, useCallback, useEffect, useState } from 'react';
import { SvgAddButton } from '../../../../assets/svg-icons';
import { ICommonProps } from '../../../../shared/models';
import { Button } from '../../../../theme/components';
import WorkoutItem from '../WorkoutItem';
import styles from './index.module.css';
import {
    DayModel,
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
    onDropped: (params: {
        fromDay: DayModel;
        toDay: DayModel;
        fromIndex: number;
        toIndex: number;
    }) => void;
}

const WorkoutsInDayColumn = (props: IWorkoutsInDayColumnProps) => {
    const { isInit, dayName, date, workoutsInDay, onDropped } = props;

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
    const handleWorkoutReordered = useCallback(
        ({ fromData, toData, fromIndex, toIndex }: ReorderEvent) => {
            // Check same fromDa and ToData -> ignore
        },
        []
    );

    const handleWorkoutDropped = useCallback(
        (params: AddEvent) => {
            onDropped({
                fromDay: params.fromData as DayModel,
                toDay: params.toData as DayModel,
                fromIndex: params.fromIndex,
                toIndex: params.toIndex,
            })
        },
        [onDropped]
    );
    //#endregion

    return (
        // TODO: handle with isInit
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
                        group="cardsGroup"
                        data={{
                            date: date,
                            dayName: dayName,
                        }}
                        // handle=".workout-header"
                        onReorder={handleWorkoutReordered}
                        onAdd={handleWorkoutDropped}
                    >
                        {workoutsInDayCloned?.workouts?.length > 0 ? (
                            workoutsInDayCloned?.workouts.map((workout) => {
                                return (
                                    <WorkoutItem
                                        key={workout.id}
                                        workout={workout}
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
