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
    constructor(init?: Partial<WorkoutViewModel>) {
        super();
        Object.assign(this, init);
    }
}
