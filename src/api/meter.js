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

const getPricingPlans = () => {
    return axiosInstance.get('get-pricing-plans')
}

const comparePricePlan = (meterId) => {
    return axiosInstance.get(`price-plans/compare-all/${meterId}`)
}

const recommendedPricePlans = (meterId) => {
    return axiosInstance.get(`price-plans/recommend/${meterId}`)
}

export { getAllMeters, addNewMeter, getAMeterReadings, addReadings, getPricingPlans, comparePricePlan, recommendedPricePlans }