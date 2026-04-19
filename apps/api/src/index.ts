import express, { Request, Response } from 'express';
import cors from 'cors';

import { prisma } from 'db';

//const prisma = new PrismaClient();

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

//mock up database
let posts = [
        { id: '1', title: 'Essen heute Abend', author: "Lucas", date:"2026-04-09T12:59:38.748Z", text: "Montags gibt es Studirabbat bei Ragazzi", tags: "react, mobile" },
        { id: '2', title: 'Sonntag Padel?', author: "Caroline", date:"2026-04-11T12:59:38.748Z", text: "Möchte ein Feld für 14:00 reservieren", tags: "react, mobile" },
        { id: '3', title: 'Mensa Westerberg', author: "Diego", date:"2026-04-12T12:59:38.748Z", text: "Isst jemand heute in der Mensa um 13:45?", tags: "react, mobile" },
        { id: '4', title: 'Abmeldung Sonntag', author: "Angie", date:"2026-04-13T12:59:38.748Z", text: "Sorry, am Sonntag werde ich nicht dabei sein können", tags: "react, mobile" },
      ];



//REST METHODS

//GET 200, obtain posts
app.get('/posts', async (req, res) =>{
  const posts = await prisma.post.findMany();
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
app.post('/posts', async (req, res)=>{
  //req.body is the whole post
  const title = req.body.title;
  const author = req.body.author;
  const date =  new Date().toISOString();
  const text = req.body.text;
  const tags = req.body.tags

  try{
    const newPost = await prisma.post.create({
      data: {
        title,
        author,
        text,
        tags,
        date
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
    // if (error.code === 'P2025') {
    //   return res.status(404).json({ message: 'Post not found' });
    // }

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