export class ExerciseBaseModel {
    id!: string;
    name!: string;
    numberOfSet!: number;
    info!: string;

    constructor(init?: Partial<ExerciseBaseModel>) {
        Object.assign(this, init);
    }
}

export class ExerciseViewModel extends ExerciseBaseModel {
    numberOfSet: number = 0;

    constructor(init?: Partial<ExerciseViewModel>) {
        super();
        Object.assign(this, init);
    }
}
