const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); 

//POST /create: Endpoint para crear una publicación.
router.post("/create", async(req, res) => {
    try {
        const post = await Post.create(req.body);        
        
        res.status(201).send(post);
    } catch (error) {
        if (!req.body.title || !req.body.body) {
        res.status(400).json('Los dos campos son obligatorios')
        }
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a post" });
    }
});

//GET /: Endpoint para traer todas las publicaciones.
router.get("/", async(req, res) => {
    try {
        const post = await Post.find(); 
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res

            .status(500)
            .send({ message: "There was a problem trying to show all posts " });
    }
}); 

//sGET /postsWithPagination: Endpoint para traer todas las publicaciones de 10 en 10 (paginación)
router.get('/postsWithPagination', async (req, res) => {
    try {
        const limit = 10
        let page = 1
        page = parseInt(req.query.page); 
        // req query devuelve un string por lo que debemos convertirlo en numero con parseInt

        const posts = await Post.find()
            .skip((page - 1) * limit) // Saltar los documentos previos por ejemplo si estoy en la pagina 2
            .limit(limit); // Limitar la cantidad de documentos por pagina

        res.status(200).json(posts)
    } 
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to show the posts" });
    }
});

//GET /id/:_id: Endpoint para buscar publicación por id.
router.get("/id/:_id", async(req, res) => {
    const id = req.params._id;
    try {
        const post = await Post.findById(id)
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to show a post" });
    }
});

//GET /title/:title: Endpoint para buscar una publicación por su titulo.
router.get("/title/:title", async(req, res) => {
    const title = req.params.title;
    try {
        const post = await Post.findOne({title: title})
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to show a title" });
    }
});

//PUT /id/:_id: Endpoint para actualizar una publicación.
router.put("/id/:_id", async(req, res) => {
    const id = req.params._id;
    const title = req.body.title;
    const body = req.body.body;
    try {
        const post = await Post.findByIdAndUpdate(id, {title,body},{new : true})
        res.status(201).send(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to change the post" });
    }
});


//DELETE /id/:_id: Endpoint para eliminar una publicación.
router.delete("/id/:_id", async(req, res) => {
    const id = req.params._id;
    try {
        const post = await Post.findByIdAndDelete(id);
        res.status(200).send({ message: "Post deleted" });

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to delete a post" });
    }
});

module.exports = router; 