const request = require('supertest');
const app = require('../index.js');

const { Post } = require("../models/Post.js");

describe("test/posts", () => {

    //Definimos user que se usará en el test de creación de usuario. 
    // Este user sería el equivalente al que envíamos por el body en el Postman.

    const post = {
        title: "titulo",
        body: "mensaje",
    };

    test("Create a post", async () => {
        let postsCount = await Post.countDocuments({});
        expect(postsCount).toBe(0);
        resPost = await request(app).post("/create").send(post).expect(201);

        postsCount = await Post.countDocuments({});
        expect(postsCount).toBe(1);
        /*
        expect(resPost.body.post._id).toBeDefined();
        expect(resPost.body.post.title).toBeDefined();
        expect(resPost.body.post.body).toBeDefined(); */
    });
  
  //Una vez se ejecuten los tests limpiamos la colección de posts
    describe("test/posts", () => { 
        afterAll(() => {
        return Post.deleteMany();
        });
    });
});