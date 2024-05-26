import axiosInstance from "./axios"

const getAllMeters = () => {
    return axiosInstance.get('get-all-meters')
}

const addNewMeter = () => {
    return axiosInstance.post('create-meter')
}

export { getAllMeters, addNewMeter }