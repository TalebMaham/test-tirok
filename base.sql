-- Table pour les utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_buyer BOOLEAN,
  is_seller BOOLEAN
);

CREATE TABLE props (
    id SERIAL PRIMARY KEY,
    seller INT NOT NULL,
    description VARCHAR(255),
    loc VARCHAR(255),
    value FLOAT,
    stat VARCHAR(255)

);
-- Table pour les contrats intelligents (Smart Contracts)
CREATE TABLE IF NOT EXISTS smart_contracts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INT REFERENCES users(id) NOT NULL,
  prop_id INT REFERENCES props(id)
);

-- Table pour les jetons (Tokens)
CREATE TABLE IF NOT EXISTS tokens (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES users(id) NOT NULL,
  smart_contract_id INT REFERENCES smart_contracts(id),
  value FLOAT NOT NULL,
  prop_id INT REFERENCES props(id)
);



-- Liaison entre les utilisateurs et les contrats intelligents (propriétaires)
ALTER TABLE smart_contracts ADD CONSTRAINT fk_smart_contract_owner FOREIGN KEY (owner_id) REFERENCES users(id);

-- Liaison entre les jetons, les utilisateurs (propriétaires) et les contrats intelligents
ALTER TABLE tokens ADD CONSTRAINT fk_token_owner FOREIGN KEY (owner_id) REFERENCES users(id);
ALTER TABLE tokens ADD CONSTRAINT fk_token_smart_contract FOREIGN KEY (smart_contract_id) REFERENCES smart_contracts(id);
