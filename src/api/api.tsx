import Person from "../components/types";

const BASE_URL = "http://localhost:3000";

// To have autocompletion and avoid mistypes
type RequestMethod = "GET" | "POST";
// type options = Object;

// const request = (url: string, options?: options) => {
//     return fetch(`${BASE_URL}${url}`, options).then((response) => {
//         if (!response.ok) {
//             throw `${response.status} - ${response.statusText}`;
//         }

//         return response.json();
//     });
//     // .then((result) => result);
// };

// const post = (url: string, data: Person) => {
//     return request(url, {
//         method: "POST",
//         header: { "Content-Type": "application/json; charset=UTF-8" },
//         body: JSON.stringify(data),
//     });
// };

function request(
    url: string,
    method: RequestMethod = "GET",
    data: any = null // we can send any data to the server
) {
    const options: RequestInit = { method };

    if (data) {
        // We add body and Content-Type only for the requests with data
        options.body = JSON.stringify(data);
        options.headers = {
            "Content-Type": "application/json; charset=UTF-8",
        };
    }

    // for a demo purpose we emulate a delay to see if Loaders work
    return fetch(BASE_URL + url, options).then((response) => response.json());
}

export const api = {
    get: (url: string) => request(url),
    post: (url: string, data: Person) => request(url, "POST", data),
};
