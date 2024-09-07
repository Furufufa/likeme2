import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { pool, createTable, insertPost, likePost, deletePost } from './db/configuracion.js';

const app = express();

// Habilitamos middleware y CORS
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Creando la tabla al iniciar el servidor
createTable();

// Ruta GET para obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener posts' });
    }
});

// Ruta POST para crear un nuevo post
app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    try {
        await insertPost(titulo, img, descripcion);
        res.status(201).json({ message: 'Post creado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el post' });
    }
});

// Ruta PUT para dar like a un post
app.put('/posts/like/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); // Asegúrate de que el id sea un número
    try {
        await likePost(id);
        res.status(200).json({ message: 'Like agregado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al dar like al post' });
    }
});

// Ruta DELETE para eliminar un post
app.delete('/posts/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10); // Asegúrate de que el id sea un número
    try {
        await deletePost(id);
        res.status(200).json({ message: 'Post eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



