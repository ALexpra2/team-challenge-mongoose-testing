const request = require('supertest');
const app = require('../index.js');

const Post = require("../models/Post");

describe("test/posts", () => {

    //Como comparamos expect(postsCount).toBe(0); al principio la coleccion debe estar vacia
    //por lo que borramos todos los datos    
    
    beforeAll(() => {
        return Post.deleteMany();
    }) ;

    //Definimos post que se usará en el test de creación de usuario. 
    // Este post sería el equivalente al que envíamos por el body en el Postman.

    const post = {     
        title: "titulo",
        body: "mensaje",
    }; 
    
    test("Create a post", async () => {
        let postsCount = await Post.countDocuments();
        expect(postsCount).toBe(0); 
        const resPost = await request(app).post("/create").send(post).expect(201);

        postsCount = await Post.countDocuments();
        expect(postsCount).toBe(1);
        
        //expect(resPost.body._id).toBeDefined();
        expect(resPost.body.title).toBeDefined();
        expect(resPost.body.body).toBeDefined(); 
    });
  
  //Una vez se ejecuten los tests limpiamos la colección de posts
  afterAll(() => {
    return Post.deleteMany();
  }) ;

  
});
