import { WorkoutViewModel } from './workout.model';

export class WorkoutDayBaseModel {
    [day: string]: WorkoutViewModel[];

    constructor(init?: Partial<WorkoutDayBaseModel>) {
        Object.assign(this, init);
    }
}

export class WorkoutDayViewModel extends WorkoutDayBaseModel {
    constructor(init?: Partial<WorkoutDayViewModel>) {
        super();
        Object.assign(this, init);
    }
}