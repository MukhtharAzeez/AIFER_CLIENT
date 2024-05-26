import axiosInstance from "./axios"

const getAllMeters = () => {
    return axiosInstance.get('get-all-meters')
}

export { getAllMeters }