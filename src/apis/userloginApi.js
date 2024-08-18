import http from "./http.js"
const apiUrl=`http://localhost:5000/api/v1/react`;
const createUser= data => http.post(`${apiUrl}/auth/login`,data)
const userloginApi={createUser}
export default userloginApi