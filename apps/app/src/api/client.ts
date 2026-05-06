
import AsyncStorage from "@react-native-async-storage/async-storage";

//const BASE_URL = "http://192.168.178.23:3000"; //Home
const BASE_URL = "http://172.22.116.28:3000"; //Uni
//const BASE_URL = "http://192.168.0.5:3000"; // Caro



//CREATE NEW USER
type CreateUserDTO = {
  name?: string;
  email: string;
  password: string;
}; 
export const createUser = async(user:CreateUserDTO) =>{
  try{
    const res = await fetch(`${BASE_URL}/register`,{
      method: "POST",
          headers :{
              "Content-Type": "application/json",
          },
          body: JSON.stringify(user)
    })
    
    const data = await res.json();

    if (!res.ok) {
      // launches the message from backend
      throw new Error(data.message || "Login failed");
    }

    return data;
  }
  catch(error:any){
    console.error("loginUser error:", error.message);
    throw error; // so the frontend can catch the message
  }
}


//LOGIN USER
type LoginUserDTO = {
  email: string;
  password: string;
}; 
export const loginUser = async (user:LoginUserDTO) => {
  try{
    const res = await fetch(`${BASE_URL}/login`,{
      method: "POST",
          headers :{
              "Content-Type": "application/json",
          },
          body: JSON.stringify(user)
    })
  
    const data = await res.json();

    if (!res.ok) {
      // launches the message from backend
      throw new Error(data.message || "Login failed");
    }

    return data;

  } catch (error: any) {
    console.error("loginUser error:", error.message);
    throw error; // so the frontend can catch the message
  }
}


//GET POSTS
export const getPosts = async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    return res.json();
};


//GET ONE POST
export const getPostById  = async (id:string) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`);
    return res.json();
};


//CREATE NEW POST
export const createPost = async(post:any) => {
  const token = await AsyncStorage.getItem("token");

  try{
    const res = await fetch (`${BASE_URL}/posts`,{
        method: "POST",
        headers :{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, //important
        },
        body: JSON.stringify(post)
    })

    const data = await res.json();

    if (!res.ok) {
      // launches the message from backend
      throw new Error(data.message || "Login failed");
    }

    return data;
  }
  catch(error:any) {
    console.error("createPost error:", error.message);
    throw error; // so the frontend can catch the message
  }
    
};

//UPDATE POST
export const updatePost = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

//DELETE POST
export const deletePost = async (id: string) => {
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
};