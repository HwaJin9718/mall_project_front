import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/todo`

export const getOne = async (tno) => {
    const res = await axios.get(`${prefix}/${tno}`)
    return res.data
}

export const getList = async (pageParam) => {
    const {page, size} = pageParam
    const res = await axios.get(`${prefix}/list`, {params: {page, size}}) // {params: {...pageParam}} 으로도 가능
    return res.data
}

export const postAdd = async (todoObj) => {

    // JSON.stringify(obj) => JSON 문자열로 변경해야 했지만 axios를 사용하면 그냥 쓰면 됨
    const res = await axios.post(`${prefix}/`, todoObj)
    return res.data
}
