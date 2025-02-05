const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); 

/* POST /create: Endpoint para crear una publicación.
GET /: Endpoint para traer todas las publicaciones.
GET /id/:_id: Endpoint para buscar publicación por id.
GET /title/:title: Endpoint para buscar una publicación por su titulo.
PUT /id/:_id: Endpoint para actualizar una publicación.
DELETE /id/:_id: Endpoint para eliminar una publicación.
 */
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

//Buscamos todos los registro de post
router.get("/", async(req, res) => {
    try {
        const post = await Post.find(); 
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res

            .status(500)
            .send({ message: "There was a problem trying to show all post " });
    }
}); 

//encontrar una tarea por id
router.get("/id/:_id", async(req, res) => {
    const id = req.params._id;
    try {
        const post = await Post.findById(id)
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to show a user" });
    }
});

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