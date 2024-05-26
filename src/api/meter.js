import axiosInstance from "./axios"

const getAllMeters = () => {
    return axiosInstance.get('get-all-meters')
}

const addNewMeter = () => {
    return axiosInstance.post('create-meter')
}

const getAMeterReadings = (meterId) => {
    return axiosInstance.get(`readings/read/${meterId}`)
}

const addReadings = (readings) => {
    return axiosInstance.post(`readings/store`, readings)
}

export { getAllMeters, addNewMeter, getAMeterReadings, addReadings }