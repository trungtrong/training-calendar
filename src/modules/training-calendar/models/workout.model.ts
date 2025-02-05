import { DayModel } from './day.model';
import { ExerciseViewModel } from './exercise.model';

export class WorkoutBaseModel {
    id?: string;
    name?: string;
    date!: string;
    exercises?: ExerciseViewModel[];

    constructor(init?: Partial<WorkoutBaseModel>) {
        Object.assign(this, init);
    }
}

export class WorkoutViewModel extends WorkoutBaseModel {
    exercises: ExerciseViewModel[] = [];

    constructor(init?: Partial<WorkoutViewModel>) {
        super();
        Object.assign(this, init);
    }
}

export class WorkoutByDayModel extends DayModel {
    workoutId!: string;

    constructor(init?: Partial<WorkoutByDayModel>) {
        super();
        Object.assign(this, init);
    }
}