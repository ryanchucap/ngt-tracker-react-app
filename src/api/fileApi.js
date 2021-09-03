import axios from "axios";

const baseUrl = "http://localhost:5000/files/";

const api = axios.create();

api.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2));
    return request;
});

api.interceptors.response.use((response) => {
    console.log("Response:", JSON.stringify(response, null, 2));
    return response;
});

export function uploadFile(file) {
    return new Promise((resolve, reject) => {
        api.post(baseUrl, file)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function downloadFile() {
    return new Promise((resolve, reject) => {
        api.get(baseUrl + "testexcel.xlsx", { responseType: "blob" })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
