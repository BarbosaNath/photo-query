create table if not exists users (
    id integer primary key autoincrement,
    email text not null unique,
    password text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS characteristics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subcharacteristics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    characteristic_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (characteristic_id) REFERENCES characteristics(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS product_characteristics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    subcharacteristic_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
    FOREIGN KEY (subcharacteristic_id) REFERENCES subcharacteristics(id)
);

CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

// Sample data
INSERT INTO users (email, password) VALUES ('user@example.com', 'password123');

INSERT INTO categories (name) VALUES ('Electronics');
INSERT INTO categories (name) VALUES ('Clothing');
INSERT INTO categories (name) VALUES ('Home & Kitchen');

INSERT INTO characteristics (name) VALUES ('Color');
INSERT INTO characteristics (name) VALUES ('Size');

INSERT INTO subcharacteristics (characteristic_id, name) VALUES (1, 'Red');
INSERT INTO subcharacteristics (characteristic_id, name) VALUES (1, 'Blue');
INSERT INTO subcharacteristics (characteristic_id, name) VALUES (2, 'Small');
INSERT INTO subcharacteristics (characteristic_id, name) VALUES (2, 'Medium');

INSERT INTO products (name, category_id) VALUES ('Smartphone', 1);
INSERT INTO products (name, category_id) VALUES ('T-Shirt', 2);
INSERT INTO products (name, category_id) VALUES ('Coffee Maker', 3);

INSERT INTO product_characteristics (product_id, characteristic_id, subcharacteristic_id) VALUES (1, 1, 1); // Smartphone - Color: Red
INSERT INTO product_characteristics (product_id, characteristic_id, subcharacteristic_id) VALUES (1, 2, 2); // Smartphone - Size: Medium
INSERT INTO product_characteristics (product_id, characteristic_id, subcharacteristic_id) VALUES (2, 1, 2); // T-Shirt - Color: Blue
INSERT INTO product_characteristics (product_id, characteristic_id, subcharacteristic_id) VALUES (2, 2, 1); // T-Shirt - Size: Small
INSERT INTO product_characteristics (product_id, characteristic_id, subcharacteristic_id) VALUES (3, 1, 1); // Coffee Maker - Color: Red

SELECT * FROM users;

SELECT * FROM categories;

SELECT * FROM products;

SELECT * FROM product_images;

SELECT ch.id AS characteristic_id, 
       ch.name AS characteristic_name, 
       sub.id AS subcharacteristic_id, 
       sub.name AS subcharacteristic_name
    FROM characteristics ch
    JOIN subcharacteristics sub
    ON ch.id = sub.characteristic_id;

SELECT * from product_characteristics;


SELECT p.*, c.name AS category_name, pi.image_url, pc.characteristic_id, pc.subcharacteristic_id
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_characteristics pc ON p.id = pc.product_id;