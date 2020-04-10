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
    name?: string;
    workLoad?: number;
    credits?: number;
    price?: number;
    teacher?: User;
    students: User[]
}

export type User = {
    email?: string;
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
    subjects: Subject[];
    isRegisterCompleted: boolean;
    isNewStudent: boolean;
    isProfileComplete: boolean;
    avatar: string;
}