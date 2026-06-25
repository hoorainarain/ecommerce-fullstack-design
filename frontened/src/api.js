import axios from 'axios'

const API = axios.create({
  baseURL: 'https://ecommerce-fullstack-design-eosin-nine.vercel.app/api',
})

export default API