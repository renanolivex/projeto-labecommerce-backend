-- Active: 1688838238709@@127.0.0.1@3306

--USERS
CREATE TABLE if NOT EXISTS users(
 id TEXT PRIMARY KEY UNIQUE NOT NULL,
 name TEXT NOT NULL,
 email TEXT UNIQUE NOT NULL,
 password TEXT NOT NULL,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, email, password)
VALUES ("u001", "Fulano", "fulano@email.com", "fulano123"),
("u002", "Fulano2", "fulano2@email.com", "fulano1232"),
("u003", "Fulano3", "fulano3@email.com", "fulano12321");

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

INSERT INTO users (id, name, email, password)
VALUES ("u004", "Fulano4", "fulano4@email.com", "fulano44442" );

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
WHERE id = "prod006";


--Criar tabela Purchases

CREATE TABLE IF NOT EXISTS purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO purchases (id, buyer, total_price)
VALUES ("pur001", "u001", 258.50),
("pur002", "u002", 200.50),
("pur003", "u001", 125.00),
("pur004", "u003", 50.50),
("pur005", "u001", 47.80);

SELECT * FROM purchases;

DROP TABLE purchases;

UPDATE purchases
SET total_price = 248.50
WHERE purchase_id = "pur003";

-- UNINDO TABELAS PURCHASES e USER
SELECT purchases.id AS "ID Compra", users.id AS "ID Comprador", users.name AS "Nome Comprador", users.email AS "Email", purchases.total_price AS "Preço total", purchases.created_at AS "Criado em"
FROM purchases
JOIN users ON users.id = purchases.buyer;

--Criação de tabela de relação

CREATE TABLE IF NOT EXISTS purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT
    );

DROP TABLE purchases_products;

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES ("pur001", "prod002",2 ),
("pur003", "prod001",1 ),
("pur002", "prod003",4 );

SELECT * FROM products
LEFT JOIN purchases_products
ON purchases_products.product_id = products.id
LEFT JOIN purchases
ON purchases_products.purchase_id = purchases.id;


UPDATE users
SET id = "u000"
WHERE id ="u001";

--- USADO PARA TESTE

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM purchases;

SELECT * FROM purchases_products;

DROP TABLE users;
DROP TABLE products;
DROP TABLE purchases;
DROP TABLE purchases_products;









