import { UserGenders, UserRoles } from "../enums/users";
import { ObjectId } from 'mongodb';

export interface IAttendanceModel {
    clockedInAt: Date;
    clockedOutAt?: Date;
}
export interface IContactInfoModel {
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    pin: string;
}
export interface IUserSettingsModel {
    isActive: boolean;
    role: UserRoles;
}
export interface IUserModel {
    _id?: string | ObjectId;
    firstName: string;
    lastName?: string;
    gender: UserGenders;
    dateOfBirth: Date;
    contactInfo: IContactInfoModel;
    settings: IUserSettingsModel;
    attendance: IAttendanceModel[];
}