CREATE DATABASE system_products;

USE system_products;

CREATE TABLE tb_produtos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255),
    categoria VARCHAR(255),
    descriacao VARCHAR(255),
    preco FLOAT,
    disponibilidade FLOAT
)