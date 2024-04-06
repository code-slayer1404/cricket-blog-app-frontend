import axios from "axios"

// export const BASE_URL = "http://localhost:8080"
export const BASE_URL = "http://a1-env.eba-kwdbvgwe.ap-south-1.elasticbeanstalk.com"
export const myAxios = axios.create({
    baseURL: BASE_URL
})