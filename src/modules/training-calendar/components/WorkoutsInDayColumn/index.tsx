// TODO: Fix Path issue
import { memo, useEffect, useState } from 'react';
import { SvgAddButton } from '../../../../assets/svg-icons';
import { ICommonProps } from '../../../../shared/models';
import { Button } from '../../../../theme/components';
import WorkoutItem from '../WorkoutItem';
import styles from './index.module.css';
import { WorkoutsInDayBaseModel } from '../../models';
import { DateHelper } from '../../../../helpers';

// Refer to: https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/Sortable/Customization/MaterialBlueLight/
import { Sortable, SortableTypes } from 'devextreme-react/sortable';

interface IWorkoutsInDayColumnProps extends ICommonProps {
    day: string;
    date: string; // isoString
    workoutsInDay: WorkoutsInDayBaseModel;
}

const WorkoutsInDayColumn = (props: IWorkoutsInDayColumnProps) => {
    const { day, date, workoutsInDay } = props;

    const [isCurrentDate, setIsCurrentDate] = useState(false);
    const [dateNumber, setDateNumber] = useState(0);

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

    return (
        <div className={styles['kanban-column-container']}>
            {/* Day Name */}
            <div className={`${styles['kanban-column__day']} truncate`}>
                {day}
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
                    {workoutsInDay?.workouts?.length > 0 ? (
                        workoutsInDay?.workouts.map((workout, workoutIndex) => {
                            return (
                                <WorkoutItem
                                    key={workoutIndex}
                                    workout={workout}
                                ></WorkoutItem>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(WorkoutsInDayColumn);
