import axios from "axios";

const baseUrl = "http://localhost:5000/files";

export function uploadFile(file) {
    return new Promise((resolve, reject) => {
        axios
            .post(baseUrl, file)
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
        axios
            .get(baseUrl + "/testexcel.xlsx", { responseType: "blob" })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
