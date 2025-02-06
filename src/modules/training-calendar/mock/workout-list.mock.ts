import { ExerciseViewModel, WorkoutViewModel } from '../models';
import { WorkoutsInDayViewModel } from '../models';

export class WorkoutListMock {
    static generateWorkoutsInDay(params: { 
        date: string,
        dayName: string;
        dayIndexInWeek: number 
    }): WorkoutsInDayViewModel {
        switch (params.dayIndexInWeek) {
            case 2:
                return new WorkoutsInDayViewModel({
                    date: params.date,
                    dayName: params.dayName,
                    dayIndexInWeek: params.dayIndexInWeek,
                    workouts: [
                        new WorkoutViewModel({
                            id: 'workout-0' + 'tue',
                            name: 'Chest day - with arm',
                            date: params.date,
                            exercises: [
                                new ExerciseViewModel({
                                    id: 'Exercise-0-1-' + params.date,
                                    name: 'Bench Press Med',
                                    numberOfSet: 3,
                                    info: '50 lb x 5, 60 lb x 5, 70 l...'
                                }),
                                new ExerciseViewModel({
                                    id: 'Exercise-0-2-' + params.date,
                                    name: 'Exercise B',
                                    numberOfSet: 1,
                                    info: '40 lb x 10'
                                })
                            ]
                        })
                    ]
                });
            case 3:
                return new WorkoutsInDayViewModel({
                    date: params.date,
                    dayName: params.dayName,
                    dayIndexInWeek: params.dayIndexInWeek,
                    workouts: [
                        new WorkoutViewModel({
                            id: 'workout-1' + params.date,
                            name: 'LED DAY',
                            date: params.date,
                            exercises: [
                                new ExerciseViewModel({
                                    id: 'Exercise-1-1-' + params.date,
                                    name: 'Exercise C',
                                    numberOfSet: 1,
                                    info: '30 lb x 6'
                                }),
                                new ExerciseViewModel({
                                    id: 'Exercise-1-2-' + params.date,
                                    name: 'Exercise D',
                                    numberOfSet: 1,
                                    info: '40 lb x 5'
                                }),
                                new ExerciseViewModel({
                                    id: 'Exercise-1-3-' + params.date,
                                    name: 'Exercise E',
                                    numberOfSet: 1,
                                    info: '50 lb x 5'
                                })
                            ]
                        }),
                        new WorkoutViewModel({
                            id: 'workout-2' + params.date,
                            name: 'ARM DAY',
                            date: params.date,
                            exercises: [
                                new ExerciseViewModel({
                                    id: 'Exercise-2-1-' + params.date,
                                    name: 'Exercise F',
                                    numberOfSet: 1,
                                    info: '60 lb x 6'
                                })
                            ]
                        }),
                    ]
                });
            default:
                return new WorkoutsInDayViewModel({
                    date: params.date,
                    dayName: params.dayName,
                    dayIndexInWeek: params.dayIndexInWeek,
                    workouts: []
                });;
        }
    }
}