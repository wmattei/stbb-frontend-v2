export enum UserRoleEnum {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
}

export enum CourseStatusEnum {
    ONGOING = 'ongoing',
    LOCKED = 'locked',
    FINISHED = 'finished',
}

export enum PaymentTypeEnum {
    IN_CASH = 'IN_CASH',
    SCOLARSHIP = 'SCOLARSHIP',
    FINANCED = 'financed',
}

export enum GenderEnum {
    MALE = 'male',
    FEMALE = 'female',
}

export type Subject = {
    id?: string;
    name?: string;
    workLoad?: number;
    credits?: number;
    price?: number;
};

export type FileModel = {
    id: string;
    createdAt?: string;
    originalPath?: string;
    croppedPath?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotate?: number;
    name?: string;
    gallery?: string;
    mimeType?: string;
    key?: string;
    class?: Class;
    description?: string;
};

export type Class = {
    id?: string;
    name?: string;
    teacher?: User;
    subject: Subject;
    students?: User[];
    documents?: User[];
};

export type User = {
    id?: string;
    email?: string;
    password?: string;
    role?: UserRoleEnum;
    lastLogin?: Date;
    name?: string;
    document?: string;
    countryCode?: string;
    paymentType?: PaymentTypeEnum;
    courseStatus?: CourseStatusEnum;
    fathersName?: string;
    mothersName?: string;
    birthdate?: Date;
    scholarity?: string;
    placeOfBirth?: string;
    dateOfStart?: Date;
    dateOfEnd?: Date;
    gender?: GenderEnum;
    observation?: string;
    isRegisterCompleted?: boolean;
    isNewStudent?: boolean;
    isProfileComplete?: boolean;
    avatar?: string;
    classes?: Class[];
};

export type Pagination = {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
};
