const url = " http://127.0.0.1:8787";
import axios from "axios";

export async function getUserTaskStr() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const res = await axios.get(`${url}/api/v1/userStr/userTaskStr`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while getting userstr")
    return false
  }
}

export async function addtag(tag) {
     const token = localStorage.getItem("token");
     if (!token) {
       return false;
     }
      try {
        const res = await axios.post(`${url}/api/v1/userStr/addTag`,{tag}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
         
        });
        if (res.status !== 200) {
          return false;
        }
        return res.data;
      } catch (error) {
         console.error(
           "Error adding tag:",
           error.response?.data || error.message
         );
         return false; 
      }
}