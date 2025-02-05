const express = require('express');
const { dbConnection } = require('./config/config');
const postsRoutes = require('./routes/posts');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', postsRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


module.exports = app;