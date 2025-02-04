export class BaseModel {
    id!: string;
    createdAt?: string;
    createdBy?: string | null;
    updatedAt?: string;
    updatedBy?: string;
    deletedAt?: string;
    deletedBy?: string;
    isDeleted?: boolean;
    isError?: boolean;

    constructor(init?: Partial<BaseModel>) {
        Object.assign(this, init);
    }
}
