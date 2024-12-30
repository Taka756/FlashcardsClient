import axios from "axios";
const authHeaderValue = process.env.REACT_APP_OAUTH_AUTH_HEADER;
// axios.defaults.baseURL =  "http://localhost:9001"
const apiClient = axios.create({
    baseURL: "http://localhost:9001",
    headers: {
        'Authorization': "Bearer " + window.localStorage.getItem("access_token")
    }
});
export default {
    testRestApi(){
        apiClient.get("/test").then(response => {
            console.log(response.data)
        })
    }
}