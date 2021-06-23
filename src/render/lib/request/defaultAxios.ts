import axios from 'axios'
const defaultAxios = axios.create({
  timeout: 1000
})
export default defaultAxios
