import { WorkoutViewModel } from './workout.model';

export class WorkoutDaysViewModel {
    [day: string]: WorkoutsInDayViewModel;

    constructor(init?: Partial<WorkoutDaysViewModel>) {
        Object.assign(this, init);
    }
}

export class WorkoutsInDayBaseModel {
    date!: string; // isoString
    workouts!: WorkoutViewModel[];

    constructor(init?: Partial<WorkoutsInDayBaseModel>) {
        Object.assign(this, init);
    }
}

export class WorkoutsInDayViewModel extends WorkoutsInDayBaseModel {
    dayName!: string;
    dayIndexInWeek!: number;
    workouts: WorkoutViewModel[] = [];

    constructor(init?: Partial<WorkoutsInDayViewModel>) {
        super();
        Object.assign(this, init);
    }
}
