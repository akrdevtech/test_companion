export enum EAppPages {
    TASKS = 'TASKS',
    COURSE = 'COURSE',
    SETTINGS = 'SETTINGS',
    STUDENTS = 'STUDENTS',
    DASHBOARD = 'DASHBOARD',
    PERFORMANCE = 'PERFORMANCE',
    NOTIFICATIONS = 'NOTIFICATIONS',
}
export enum EPageTitles {
    TASKS = 'Task Manager',
    DASHBOARD = 'Dashboard',
    COURSE = 'Course Manager',
    STUDENTS = 'Student Manager',
    SETTINGS = 'Settings Manager',
    PERFORMANCE = 'Performance Manager',
    NOTIFICATIONS = 'Notifications Manager',
}
export enum EAlertSeverity {
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
    SUCCESS = 'success',
}
export const ECustomJoiErrors = {
    JoiStringValidationErrorMessages: {
        'string.base': `should be a 'text'`,
        'string.empty': `cannot be an empty`,
        'string.min': `minimum length of {#limit}`,
        'any.required': `required field`
    },
    JoiNumberValidationErrorMessages: {
        'number.base': `should be a 'number'`,
        'number.empty': `cannot be an empty`,
        'number.min': `minimum length of {#limit}`,
        'any.required': `required field`
    }

}