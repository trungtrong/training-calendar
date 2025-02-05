import styles from './index.module.css';
import { WorkoutsInDayColumn } from './components';
import { DAYS } from './constants';
import {
    WorkoutDaysViewModel,
    WorkoutsInDayViewModel,
} from './models';
import { DaysEnum } from './enums/days.constant';
import { useEffect, useState } from 'react';
import { DateHelper } from '../../helpers';
import { WorkoutListMock } from './mock/workout-list.helper';

const TrainingCalendar = () => {
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

    useEffect(() => {
        const { daysInWeekWithIosString } = DateHelper.getDaysInCurrentWeek();
        const workoutDays= new WorkoutDaysViewModel({
            [DaysEnum.Mon]: new WorkoutsInDayViewModel(),
            [DaysEnum.Tue]: new WorkoutsInDayViewModel(),
            [DaysEnum.Wed]: new WorkoutsInDayViewModel(),
            [DaysEnum.Thu]: new WorkoutsInDayViewModel(),
            [DaysEnum.Fri]: new WorkoutsInDayViewModel(),
            [DaysEnum.Sat]: new WorkoutsInDayViewModel(),
            [DaysEnum.Sun]: new WorkoutsInDayViewModel(),
        })
        daysInWeekWithIosString.forEach((date, index) => {
            const dayName: DaysEnum = DateHelper.convertDayNumberToDayName(index);
            workoutDays[dayName] = WorkoutListMock.generateWorkoutsInDay({
                date: date,
                dateNumber: index,
            })
        })
        setWorkoutDaysDataSource(() => {
            return workoutDays;
        });
    }, []);

    return (
        <div className={styles['training-calendar-wrapper']}>
            {/* Layout */}
            <div className={styles['training-calendar-kanban-container']}>
                {DAYS.map((day, index) => (
                    <WorkoutsInDayColumn
                        key={index}
                        workoutsInDay={workoutDaysDataSource[day]}
                        day={day}
                        date={workoutDaysDataSource[day]?.date}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrainingCalendar;
