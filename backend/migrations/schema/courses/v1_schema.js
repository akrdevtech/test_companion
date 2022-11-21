const { collectionName } = require('./common');

const CourseStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
};

const courseSchema_V1 = {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['courseId', 'courseName'],
            properties: {
                courseId: { bsonType: 'string' },
                courseName: { bsonType: 'string' },
                duration: { bsonType: 'number' },
                fee: { bsonType: 'number' },
                totalCredits: { bsonType: 'number' },
                minCredits: { bsonType: 'number' },
                studentsAttending: { bsonType: 'number' },
                studentsGraduated: { bsonType: 'number' },
                status: { bsonType: 'string', enum: Object.values(CourseStatus) },
            },
        },
    },
};

const courseIndexes_V1 = [[{ courseId: 1 }, { background: true }]];

module.exports = {
    courseSchema_V1,
    courseIndexes_V1,
    collectionName,
}