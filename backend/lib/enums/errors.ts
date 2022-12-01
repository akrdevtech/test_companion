export enum InternalErrorStatusCodes {
    FailedToFindCourse = 1001,
    FailedToInsertCourse = 1002,
    FailedToInsertCourseEnrollments = 1003
}

export enum InternalErrorMessages {
    FailedToFindCourse = "Failed to find course",
    FailedToInsertCourse = "Failed to insert new course to DB",
    FailedToInsertCourseEnrollments = "Failed to insert new course enrollment to DB",
}