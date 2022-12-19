interface IAttendanceActivity {
    in?: Date;
    out?: Date;
}
export interface IAttendanceModel {
    userId: string;
    clockedInAt: Date;
    clockedOutAt?: Date;
    activity?: IAttendanceActivity[]
}