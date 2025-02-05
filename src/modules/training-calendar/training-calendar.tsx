import styles from './index.module.css';
import { WorkoutsInDayColumn } from './components';
import { DAYS } from './constants';
import {
    DayModel,
    ExerciseViewModel,
    WorkoutByDayModel,
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

    //#region Drag, Drop Workout
    const handleWorkoutDroppedToAnotherDay = useCallback(
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
            setWorkoutDaysDataSourceCloned(
                structuredClone(workoutDaysDataSource)
            );
        },
        [workoutDaysDataSource]
    );

    const handleWorkoutReordered = useCallback(
        (params: { day: DayModel; fromIndex: number; toIndex: number }) => {
            const dayName: DaysEnum = params.day.dayName;
            const { newDataSource: newWorkouts } =
                KanbanHelper.reorderItem<WorkoutViewModel>({
                    dataSource: workoutDaysDataSource[dayName].workouts,
                    fromIndex: params.fromIndex,
                    toIndex: params.toIndex,
                });
            workoutDaysDataSource[dayName].workouts = newWorkouts;
            //
            setWorkoutDaysDataSource(structuredClone(workoutDaysDataSource));
            setWorkoutDaysDataSourceCloned(
                structuredClone(workoutDaysDataSource)
            );
        },
        [workoutDaysDataSource]
    );
    //#endregion

    //#region Drag, Drop Exercise
    const onExerciseDroppedToAnotherWorkout = useCallback(
        (params: {
            fromWorkout: WorkoutByDayModel;
            toWorkout: WorkoutByDayModel;
            fromIndex: number;
            toIndex: number;
        }) => {
            const fromWorkout = params.fromWorkout;
            const toWorkout = params.toWorkout;
            //
            const workoutsInOldDayColumn =
                workoutDaysDataSource[fromWorkout.dayName].workouts;
            const workoutsInNewDayColumn =
                workoutDaysDataSource[toWorkout.dayName].workouts;
            // Get Workout in new day column
            const workoutInOldDayIndex = workoutsInOldDayColumn.findIndex(
                (workout) => workout.id === fromWorkout.workoutId
            );
            const workoutInOldDay =
                workoutsInOldDayColumn[workoutInOldDayIndex];
            // Remove exercise item of workout in old Day column
            const {
                removedItem: removedExerciseInOldDay,
                newDataSource: newExercisesInOldDay,
            } = KanbanHelper.removeItem<ExerciseViewModel>({
                dataSource: workoutInOldDay.exercises,
                removedIndex: params.fromIndex,
            });
            workoutDaysDataSource[fromWorkout.dayName].workouts[
                workoutInOldDayIndex
            ].exercises = newExercisesInOldDay;

            // Get Workout in new day column
            const workoutInNewDayIndex = workoutsInNewDayColumn.findIndex(
                (workout) => workout.id === toWorkout.workoutId
            );
            const workoutInNewDay =
                workoutsInNewDayColumn[workoutInNewDayIndex];
            // Insert exercise item in new Day column
            const { newDataSource: newExercisesInNewDay } =
                KanbanHelper.insertItem<ExerciseViewModel>({
                    dataSource: workoutInNewDay.exercises,
                    newItem: removedExerciseInOldDay,
                    toIndex: params.toIndex,
                });
            workoutDaysDataSource[toWorkout.dayName].workouts[
                workoutInNewDayIndex
            ].exercises = newExercisesInNewDay;
            //
            setWorkoutDaysDataSource(structuredClone(workoutDaysDataSource));
            setWorkoutDaysDataSourceCloned(
                structuredClone(workoutDaysDataSource)
            );
        },
        [workoutDaysDataSource]
    );

    const onExerciseReorderedOnSameWorkout = useCallback(() => {}, []);
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
                        onDroppedToAnotherDay={handleWorkoutDroppedToAnotherDay}
                        onReorderedOnSameDay={handleWorkoutReordered}
                        onExerciseDroppedToAnotherWorkout={
                            onExerciseDroppedToAnotherWorkout
                        }
                        onExerciseReorderedOnSameWorkout={
                            onExerciseReorderedOnSameWorkout
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default TrainingCalendar;
