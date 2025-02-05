import styles from './index.module.css';
import { WorkoutsInDayColumn } from './components';
import { DAYS } from './constants';
import {
    DayModel,
    WorkoutDaysViewModel,
    WorkoutsInDayViewModel,
    WorkoutViewModel,
} from './models';
import { DaysEnum } from './enums/days.constant';
import { useCallback, useEffect, useState } from 'react';
import { DateHelper } from '../../helpers';
import { WorkoutListMock } from './mock/workout-list.helper';
import { KanbanHelper } from './helpers';

const TrainingCalendar = () => {
    const [isInit, setIsInit] = useState<boolean>(false);

    const [workoutDaysDataSource, setWorkoutDaysDataSource] =
        useState<WorkoutDaysViewModel>(
            new WorkoutDaysViewModel({
                [DaysEnum.Mon]: new WorkoutsInDayViewModel(),
                [DaysEnum.Tue]: new WorkoutsInDayViewModel(),
                [DaysEnum.Wed]: new WorkoutsInDayViewModel(),
                [DaysEnum.Thu]: new WorkoutsInDayViewModel(),
                [DaysEnum.Fri]: new WorkoutsInDayViewModel(),
                [DaysEnum.Sat]: new WorkoutsInDayViewModel(),
                [DaysEnum.Sun]: new WorkoutsInDayViewModel(),
            })
        );
    const [workoutDaysDataSourceCloned, setWorkoutDaysDataSourceCloned] =
        useState<WorkoutDaysViewModel>(structuredClone(workoutDaysDataSource));

    useEffect(() => {
        const { datesInWeekWithIosString } = DateHelper.getDaysInCurrentWeek();
        const workoutDays = new WorkoutDaysViewModel(
            structuredClone(workoutDaysDataSource)
        );
        datesInWeekWithIosString.forEach((date, dayIndexInWeek) => {
            const dayName: DaysEnum =
                DateHelper.convertDayNumberToDayName(dayIndexInWeek);
            workoutDays[dayName] = WorkoutListMock.generateWorkoutsInDay({
                date: date,
                dayName: dayName,
                dayIndexInWeek: dayIndexInWeek,
            });
        });
        setWorkoutDaysDataSource(workoutDays);
        setWorkoutDaysDataSourceCloned(structuredClone(workoutDays));
        setIsInit(true);
    }, []);

    //#region Reorder
    const handleWorkoutDropped = useCallback(
        (params: {
            fromDay: DayModel;
            toDay: DayModel;
            fromIndex: number;
            toIndex: number;
        }) => {
            // Remove workout item in old Day column
            const fromDayColumn =
                workoutDaysDataSource[params.fromDay.dayName].workouts;
            const toDayColumn =
                workoutDaysDataSource[params.toDay.dayName].workouts;
            const {
                removedItem: removedWorkoutInFromDay,
                newDataSource: newWorkoutsInFromDay,
            } = KanbanHelper.removeItem<WorkoutViewModel>({
                dataSource: fromDayColumn,
                removedIndex: params.fromIndex,
            });
            workoutDaysDataSource[params.fromDay.dayName].workouts =
                newWorkoutsInFromDay;
            // Insert workout item in new Day column
            const { newDataSource: newWorkoutsInToDay } =
                KanbanHelper.insertItem<WorkoutViewModel>({
                    dataSource: toDayColumn,
                    newItem: removedWorkoutInFromDay,
                    toIndex: params.toIndex,
                });
            workoutDaysDataSource[params.toDay.dayName].workouts =
                newWorkoutsInToDay;
            //
            setWorkoutDaysDataSource(structuredClone(workoutDaysDataSource));
            setWorkoutDaysDataSourceCloned(structuredClone(workoutDaysDataSource));
        },
        [workoutDaysDataSource]
    );
    //#endregion

    return (
        <div className={styles['training-calendar-wrapper']}>
            <div className={styles['training-calendar-kanban-container']}>
                {DAYS.map((dayName, index) => (
                    <WorkoutsInDayColumn
                        key={index}
                        isInit={isInit}
                        workoutsInDay={workoutDaysDataSource[dayName]}
                        dayName={dayName}
                        date={workoutDaysDataSource[dayName]?.date}
                        onDropped={handleWorkoutDropped}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrainingCalendar;
