import express, { Request, Response } from 'express';
import cors from 'cors';

import { prisma } from 'db';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware} from './middleware';
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET!;

//const prisma = new PrismaClient();

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies






//REST METHODS

//POST 200, login user
app.post('/login', async (req,res)=>{
  let email = req.body.email;
  let password = req.body.password;

   if (!email || !password ) {
    return res.status(400).json({
      message: "Email and password are obligatory"
    });
  }

  try{
    //search user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(401).json({
        message:"Password or username invalid"
      })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );
    //successful login
    res.status(200).json({
      message: "Successful login",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    }); 


  } catch(error){
    console.error(error);
  }
  
});

//POST 201, register user
app.post('/register',async (req,res)=>{
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password
  

  if (!email || !password || !name) {
    return res.status(400).json({
      message: "All fields are obligatory"
    });
  }


  try {
    //check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists!"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password:hashedPassword
      }
    });

    res.status(201).json({
      message: "User crated succesfully",
      user: newUser
    });

  }catch(error){
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });

  }

});


//GET 200, obtain posts
app.get('/posts', async (req, res) =>{
  const posts = await prisma.post.findMany({
      include: {
        author: true, //important
      },
    });
  return res.json(posts);
});

//GET 200 | 404 get specific post
app.get('/posts/:id', async (req, res)=>{
  //searched id
  try{
    let id_str = req.params.id;
    let id = Number(id_str); //from str -> int


    const post = await prisma.post.findUnique({where:{id:id}})

    //in case id not found
    if(!post) return res.status(404).json({message:'Post not found'})
    
    return res.json(post)

  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });

  }
  
});

//POST 201 create a new post
app.post('/posts', authMiddleware, async (req, res)=>{
  //req.body is the whole post
  //validieren check that data is not empty
  //do not send author !!! hackers can use it
  const title = req.body.title;
 //const authorId = req.body.authorId;
  //const date =  new Date().toISOString();
  const text = req.body.text;
  const tags = req.body.tags

  try{
    const newPost = await prisma.post.create({
      data: {
        title,
        text,
        tags,
        authorId: (req as any).user.id //req.user.id, // comes from token
      },
      
    });

    return res.status(201).json(newPost);
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Error creating post' });
  }


});

//PATCH 200, edit something from the post
app.patch('/posts/:id', async(req, res)=>{

  try { 
    let id_str = req.params.id;
    let id = Number(id_str); //from str -> int

    const date =  new Date().toISOString();

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: { 
        title : req.body.title,
        author: req.body.author,
        text: req.body.text,
        tags:req.body.tags,
        date: date

      },
    });


    return res.status(200).json(updatedPost);

  }
  catch(error){

    console.error(error);
    return res.status(500).json({ message: 'Error updating post' });
  }

});

//DELETE 204
app.delete('/posts/:id',async(req, res)=>{
  try{
    let id_str = req.params.id;
    let id = Number(id_str); //from str -> int
    const post = await prisma.post.delete({
      where: { id: Number(req.params.id) },
    });

    return res.status(204).send();

  }
  catch(error){
    console.log(error);
    return res.status(500).json({ message: 'Error deleting post' });
  }

});

//0000 allows access to local network
app.listen(3000,'0.0.0.0' ,() => {
  console.log('Server running on port 3000');
});