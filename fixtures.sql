-- Insertion de données dans la table users
INSERT INTO users (username, email, password, is_buyer, is_seller)
VALUES
  ('utilisateur1', 'utilisateur1@email.com', 'motdepasse1', true, false),
  ('utilisateur2', 'utilisateur2@email.com', 'motdepasse2', true, true),
  ('utilisateur3', 'utilisateur3@email.com', 'motdepasse3', false, true);

-- Insertion de données dans la table props
INSERT INTO props (seller, description, loc, value, stat)
VALUES
  (1, 'Description de la propriété 1', 'Emplacement 1', 100000, 'Disponible'),
  (2, 'Description de la propriété 2', 'Emplacement 2', 150000, 'Disponible'),
  (3, 'Description de la propriété 3', 'Emplacement 3', 200000, 'Sellable'),
  (1, 'Description de la propriété 4', 'Emplacement 4', 100000, 'Disponible'),
  (1, 'Description de la propriété 5', 'Emplacement 5', 150000, 'Disponible'),
  (1, 'Description de la propriété 6', 'Emplacement 6', 200000, 'Sellable'),
  (1, 'Description de la propriété 7', 'Emplacement 7', 100000, 'Disponible'),
  (2, 'Description de la propriété 8', 'Emplacement 8', 150000, 'Disponible'),
  (2, 'Description de la propriété 9', 'Emplacement 9', 200000, 'Sellable'),
  (2, 'Description de la propriété 10', 'Emplacement 10', 100000, 'Disponible'),
  (3, 'Description de la propriété 11', 'Emplacement 11', 150000, 'Disponible'),
  (3, 'Description de la propriété 12', 'Emplacement 12', 200000, 'Sellable');
  


-- Insertion de données dans la table smart_contracts
INSERT INTO smart_contracts (name, owner_id, prop_id)
VALUES
  ('Contrat 1', 1, 1),
  ('Contrat 2', 2, 2),
  ('Contrat 3', 3, 3);

-- Insertion de données dans la table tokens
INSERT INTO tokens (owner_id, smart_contract_id, value, prop_id)
VALUES
  (1, 1, 50000, 1),
  (2, 2, 75000, 2),
  (3, 3, 100000, 3);
