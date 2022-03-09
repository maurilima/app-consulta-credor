import { AUTH, BASE_AUTH } from "../Config/Config";
import { BASE_URL } from "../Config/urlApi";

let headerAuth = new Headers();

headerAuth.append('Accept', 'application/json');
headerAuth.append('Authorization', AUTH );
headerAuth.append( 'Content-Type','application/x-www-form-urlencoded')


export async function GetApiToken(){
    var requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: headerAuth,
        body: ['grant_type=client_credentials']
      }; 
    //   console.log(BASE_URL+BASE_AUTH)
    //   console.log(requestOptions);
  
      try {
          let res = await fetch(BASE_URL+BASE_AUTH, requestOptions);
        // let res = await fetch('http://coger-services.rr.gov.br:9000/transparencia/oauth/token', requestOptions);
          return await res.json();
        //   await (res.text());

      } catch (error) {
          console.log("Retorno",error)
      }


}