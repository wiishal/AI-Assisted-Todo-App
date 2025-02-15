const url = " http://127.0.0.1:8787";
import axios from "axios";


export async function login(userDetails){
    console.log(userDetails)
    try {
        const response = await axios.post(`${url}/api/v1/auth/login`,userDetails)
        console.log("form log",response)
        if(response){
            return response
        }
    } catch (error) {
     console.log("error during login", error);
     return false;
    }
}
export async function signUp(userDetails) {
  console.log(userDetails)
  try {
    const response = await axios.post(`${url}/signup`,userDetails);
    if(response){
      return response
    }
    return false
  } catch (error) {
    console.log("error during signup", error);
    return false;
  }
}
export async function validateViaToken(userToken) {
  console.log(userToken);
  try {
    const response = await axios.post(`${url}/api/v1/auth/validate`,{
        token:userToken
    });
    console.log("from validate", response);
    if (response) {
      return response;
    }
  } catch (error) {
    console.log("error while validation", error);
    return false;
  }
}
