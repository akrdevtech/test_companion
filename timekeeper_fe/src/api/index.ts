import { StudentAPIs } from "./StudentAPIs";

const commonBackendConfig = {
    baseUrl: 'http://localhost:8000/test_companion/api/v1/',
    apiKey: 'b4567rt45'
}

const APIs = {
    studentAPIs: new StudentAPIs({ apiKey: commonBackendConfig.apiKey, baseUrl: commonBackendConfig.baseUrl }),
}

export default APIs
