const request = require('supertest');
const app = require('../index.js');

const Post = require("../models/Post");

describe("test/posts", () => {

  //Como comparamos expect(postsCount).toBe(0); al principio la coleccion debe estar vacia
  //por lo que borramos todos los datos    

  beforeAll(() => {
    return Post.deleteMany();
  });

  //Definimos post que se usará en el test de creación de la post. 
  // Este post sería el equivalente al que envíamos por el body en el Postman.

  const post = {
    title: "titulo",
    body: "mensaje"
  };

  test("Create a post", async () => {
    let postsCount = await Post.countDocuments();
    expect(postsCount).toBe(0);
    const resPost = await request(app).post("/create").send(post).expect(201);

    postsCount = await Post.countDocuments();
    expect(postsCount).toBe(1);

    expect(resPost.body.title).toBeDefined();
    expect(resPost.body.body).toBeDefined();
  });

  test("All posts", async () => {
    const newPosts = [
      { title: "titulo2", body: "mensaje2" },
      { title: "titulo3", body: "mensaje3" }
    ];
    await Post.insertMany(newPosts);//insertar los newpost en la bd
    let postsCount = await Post.countDocuments();
    expect(postsCount).toBe(3);//verificar que ahora hay 3 post

    const res=await request(app).get("/").expect(200);
    const posts=[post,...newPosts];//añadir el primer post creado al array de objetos
    res.body.forEach((post,index)=> {//verificar todos
      expect(post.title).toBe(posts[index].title);
      expect(post.body).toBe(posts[index].body);
    });
  });

  //Una vez se ejecuten los tests limpiamos la colección de posts
  afterAll(() => {
    return Post.deleteMany();
  });
});
