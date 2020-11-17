import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/data',
})

export const insertData = payload => api.post(``, payload)
export const getAllData = () => api.get(``)
export const deleteData = () => api.delete(``)

const apis = {
    insertData,
    getAllData,
    deleteData,
}

export default apis