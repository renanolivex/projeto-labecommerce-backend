-- Active: 1687296243249@@127.0.0.1@3306

--USERS
CREATE TABLE if NOT EXISTS users(
 id TEXT PRIMARY KEY UNIQUE NOT NULL,
 name TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 password TEXT NOT NULL,
 created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
VALUES ("u001", "Fulano", "fulano@email.com", "fulano123",  "20/06/2022" ),
("u002", "Fulano2", "fulano2@email.com", "fulano1232",  "10/02/2023" ),
("u003", "Fulano3", "fulano3@email.com", "fulano12321",  "12/06/2023" );

--PRODUCTS
CREATE TABLE if NOT EXISTS products(
 id TEXT PRIMARY KEY UNIQUE NOT NULL,
 name TEXT NOT NULL,
 price REAL NOT NULL,
 description TEXT NOT NULL,
 image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod001","Mouse gamer", 250,"Melhor mouse do mercado!", "https://picsum.photos/seed/Mouse%20gamer/400"),
("prod002","Monitor", 900,"Monitor LED Full HD 24 polegadas", "https://picsum.photos/seed/Monitor/400"),
("prod003","Soundbar", 1099.99,"Auto Sound Engine (ASE), Bluetooth, 300W, Subwoofer Sem Fios", "https://images.kabum.com.br/produtos/fotos/467121/soundbar-lg-sqc2-bluetooh-300w-subwoofer-sem-fios-2-1-canais-auto-sound-engine-ase-adaptive-sound-control-asc-sqc2-abrallk_1686938008_gg.jpg"),
("prod004","Headset", 420.55,"Headset Plugável, PC, PS4, XBOX", "https://imgs.casasbahia.com.br/55040308/1xg.jpg"),
("prod005","Pen Drive", 18.55,"8GB, PD587", "https://http2.mlstatic.com/pen-drive-sandisk-8-gb-cruzer-blade-100-original-o-melhor-D_NQ_NP_18442-MLB20156048733_092014-F.jpg");


--Retornar todas as pessoas cadastradas

SELECT * FROM users;


--Retornar todos os produtos cadastrados

SELECT * FROM products;

--Retorna apenas produtos com "gamer" no nome

SELECT * FROM products WHERE name LIKE "%gamer";

--Add novo usuario

INSERT INTO users (id, name, email, password, created_at)
VALUES ("u004", "Fulano4", "fulano4@email.com", "fulano44442",  "22/06/2022" );

--Add novo produto

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod006","Óculos gamer", 199.90,"Óculos para passar um bom tempo jogando", "https://images.kabum.com.br/produtos/fotos/373823/oculos-para-jogos-gunnar-vertex-armacao-quadrada-nix-lentes-gunnar-focus-cor-ambar-max-lens-ver-00112_1668770092_gg.jpg");

--Excluir User
DELETE FROM users WHERE id = 'u004';

--Excluir Product

DELETE FROM products WHERE id = 'prod006';

--Editar produto por ID

UPDATE products 
SET name = "novo Nome"
WHERE id = "prod006";
UPDATE products 
SET price = 50
WHERE id = "prod006";
UPDATE products 
SET description = "nova descrição"
WHERE id = "prod006";
UPDATE products 
SET image_url = "nova image_url"
WHERE id = "prod006"

