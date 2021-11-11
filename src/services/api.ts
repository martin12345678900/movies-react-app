export type ConfigOptionsType = {
    method?: string;
    headers?: Headers
    body?: any;
}

type Headers = {
    "Content-Type"?: "application/json",
    "X-Authorization": string;
}


async function request(URL: string, configOptions: ConfigOptionsType) {
    try {
        const response = await fetch(URL, configOptions);

        if (!response.ok) {
            throw new Error((await response.json()).message);
        } else {
            const data = await response.json();

            return data;
        }
    } catch (error) {
        console.error(error.message);
    }
}

function setOptions(method: string, authToken?: string, body?: any) {
    let options: ConfigOptionsType = {
        method,
        headers: {} as Headers 
    }

    if (authToken) {
        options.headers['X-Authorization'] = authToken;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
}

const baseURL = 'https://cars-react-app-server.herokuapp.com';

async function get(endpoint: string) {
    return await request(baseURL + endpoint, setOptions('GET'));
}

async function post(endpoint: string, authToken: string, data: any) {
    return await request(baseURL + endpoint, setOptions('POST', authToken, data));
}

async function put(endpoint: string, authToken: string, data: any) {
    return await request(baseURL + endpoint, setOptions('PUT', authToken, data));
}

async function del(endpoint: string, authToken: string) {
    return await request(baseURL + endpoint, setOptions('DELETE', authToken));
}

export {
    get,
    post,
    put,
    del,
}

export default request;