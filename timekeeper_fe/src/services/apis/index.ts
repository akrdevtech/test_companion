import { CourseAPIs } from "./CourseApis";
import { StudentAPIs } from "./StudentAPIs";
import uuid from 'react-uuid';

const commonBackendConfig = {
    baseUrl: 'http://localhost:8000/study_centre/api/v1/',
    apiKey: 'b4567rt45'
}

const APIs = {
    studentAPIs: () => new StudentAPIs({ apiKey: commonBackendConfig.apiKey, baseUrl: commonBackendConfig.baseUrl, txId: uuid() }),
    courseAPIs: () => new CourseAPIs({ apiKey: commonBackendConfig.apiKey, baseUrl: commonBackendConfig.baseUrl, txId: uuid() }),
}

export default APIs
