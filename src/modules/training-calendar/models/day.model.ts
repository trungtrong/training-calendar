import { DaysEnum } from '../enums/days.constant';

export class DayModel {
    date!: string; // isoString
    dayName!: DaysEnum;

    constructor(init?: Partial<DayModel>) {
        Object.assign(this, init);
    }
}