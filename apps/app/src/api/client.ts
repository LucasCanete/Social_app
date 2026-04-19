

const BASE_URL = "http://192.168.178.23:3000"; //Home
//const BASE_URL = "http://172.22.118.150:3000"; //Uni
//const BASE_URL = "http://192.168.0.5:3000"; // Caro
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
    const res = await fetch (`${BASE_URL}/posts`,{
        method: "POST",
        headers :{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    })

    return res.json();
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