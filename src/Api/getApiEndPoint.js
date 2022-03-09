
import { BASE_URL } from "../Config/urlApi";
import { GetApiToken } from "./getApiToken";



export async  function GetApiEndPoint(raw, endPoint) {
    
    let apiKey =  await GetApiToken();
    
    let headerAuth = new Headers();
    let auth = 'Bearer ' + apiKey.access_token;

    headerAuth.append('Accept', 'application/json');
    headerAuth.append('Authorization', auth);

    var queryString = Object.keys(raw)
                            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(raw[key])}`)
                            .join('&')
    var requestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: headerAuth,
    };

    console.log(BASE_URL + endPoint + queryString)

    try {
        let res = await fetch(BASE_URL + endPoint + queryString, requestOptions);
        // console.log(res)
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}


// export default GetApiEndPoint

