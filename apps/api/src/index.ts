import express, { Request, Response } from 'express';
import cors from 'cors';

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
app.get('/posts', (req, res) =>{
  return res.json(posts);
});

//GET 200 | 404 get specific post
app.get('/posts/:id', (req, res)=>{
  //searched id
  const id  = req.params.id;

  const post = posts.find(p => p.id === id)

  //in case id not found
  if(!post) return res.status(404).json({message:'Post not found'})
  
  return res.json(post)
});

//POST 201 create a new post
app.post('/posts', (req, res)=>{
  //req.body is the whole post
  const title = req.body.title;
  const author = req.body.author;
  const date =  new Date().toISOString();
  const text = req.body.text;
  const tags = req.body.tags

  //find maximum id and add 1 
  const maxId = Math.max(...posts.map(p => Number(p.id)));
  const newId = (maxId + 1).toString();

  const newPost = {
    id:newId,
    title,
    author,
    date,
    text,
    tags
  };

  posts.push(newPost);

  return res.status(201).json(newPost);

});

//PATCH 200, edit something from the post
app.patch('/posts/:id', (req, res)=>{
  const id = req.params.id;
  const post = posts.find(p => p.id === id);
  if(!post) return res.status(404).json({message:'Post not found'})
  
  //assings req.body to the existing post, updating the fields
  Object.assign(post, req.body);

  return res.json(post);

});

//DELETE 204
app.delete('/posts/:id',(req, res)=>{
  const id = req.params.id;
  const exists = posts.some(p => p.id === id);
  if(!exists) return res.status(404).json({message:'Post not found'})

  posts = posts.filter(p => p.id != id);
  

  return res.status(204).send();

});

//0000 allows access to local network
app.listen(3000,'0.0.0.0' ,() => {
  console.log('Server running on port 3000');
});