const mongoose = require('mongoose');

//Esquema con validaciones
const PostSchema = new mongoose.Schema({
    title: {type: String, required: [true,'el titulo es obligatorio'], minlength:[5, 'Debe tener minimo cinco caracteres'] },
    body: {type: String, required: [true,'el body es obligatorio']}
    }, { timestamps: true }); 



const Post = mongoose.model('Post', PostSchema);



module.exports = Post;