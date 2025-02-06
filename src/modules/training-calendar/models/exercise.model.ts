import { BaseModel } from '@/shared/models';

export class ExerciseBaseModel extends BaseModel {
    name!: string;
    numberOfSet!: number;
    info!: string;

    constructor(init?: Partial<ExerciseBaseModel>) {
        super();
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
