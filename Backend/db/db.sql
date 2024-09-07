CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(25) NOT NULL,
    img VARCHAR(1000),
    descripcion VARCHAR(255),
    likes INT DEFAULT 0
);