import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'likeme',
  password: 'Guaguita1',
  port: 5432,
});

// Crear la tabla
const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR(25) NOT NULL,
                img VARCHAR(1000),
                descripcion VARCHAR(255),
                likes INT DEFAULT 0
            );
        `);
        console.log('Tabla creada o ya existe.');
    } catch (error) {
        console.error('Error al crear la tabla:', error);
        throw error;
    }
};

// Inserta datos en la tabla
const insertPost = async (titulo, img, descripcion) => {
    try {
        await pool.query(`
            INSERT INTO posts (titulo, img, descripcion)
            VALUES ($1, $2, $3);
        `, [titulo, img, descripcion]);
        console.log('Post insertado.');
    } catch (error) {
        console.error('Error al insertar el post:', error);
        throw error;        
    }
};

// agrega likes (modifica)
const likePost = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
    const values = [id];
    try {
        const result = await pool.query(consulta, values);
        console.log("Like agregado con éxito");
        return result;
    } catch (error) {
        console.error("Error al dar like al post:", error);
        throw error;
    }
  };

  // Borrar post
  const deletePost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    try {
      const result = await pool.query(consulta, values);
      console.log("Post eliminado con éxito");
      return result;
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      throw error;
    }
  };

export {
    pool,
    createTable,
    insertPost,
    likePost,
    deletePost
};


/*const like = async (id) => {
    try {
        await axios.put(urlBaseServer + `/posts/like/${id}`);
        await getPosts(); // Espera a que se complete antes de actualizar
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

const eliminarPost = async (id) => {
    try {
        await axios.delete(urlBaseServer + `/posts/${id}`);
        await getPosts(); // Lo mismo para eliminar
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};*/
