const { Pool } = require('pg');

// Configuration de la connexion à la base de données
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tirok_db',
  password: 'sidi',
  port: '5432',
});

// Fonction pour récupérer les tokens d'un utilisateur par son owner_id
async function getTokensByOwnerId(ownerId) {
  try {
    // Requête SQL pour récupérer les tokens de l'utilisateur
    const query = {
      text: 'SELECT id, owner_id, smart_contract_id, value FROM tokens WHERE owner_id = $1',
      values: [ownerId],
    };

    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getAvailableTokensByUserId(ownerId) {
    try {
      // Requête SQL pour récupérer les tokens de l'utilisateur
      const query = {
        text: 'SELECT id, owner_id, smart_contract_id, value FROM tokens WHERE owner_id != $1',
        values: [ownerId],
    };
    
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
        throw error;
    }
}


async function getAllPropByOwnerId(ownerId) {
    try {
      // Requête SQL pour récupérer les tokens de l'utilisateur
      const query = {
        text: 'SELECT id, seller, description, loc, value, stat  FROM props WHERE seller = $1',
        values: [ownerId],
      };
  
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  
async function  getAvailablePropByOwnerId(ownerId) {
    try {
      // Requête SQL pour récupérer les tokens de l'utilisateur
      const query = {
        text: 'SELECT id, seller, description, loc, value, stat  FROM props WHERE seller != $1 and stat = $2',
        values: [ownerId, 'Disponible'],
      };
  
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }


async function getContractsByOwnerId(ownerId) {
    try {
      // Requête SQL pour récupérer les tokens de l'utilisateur
      const query = {
        text: 'SELECT id, owner_id, name FROM smart_contracts WHERE owner_id = $1',
        values: [ownerId],
      };
  
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }



  async function sellPropertyAsSeller(userId, propId) {
    try {
      // Étape 1 : Récupérer la valeur de l'opportunité
      const getPropertyQuery = {
        text: 'SELECT value FROM props WHERE id = $1',
        values: [propId],
      };
      
      const propertyResult = await pool.query(getPropertyQuery);
  
      if (propertyResult.rowCount === 0) {
        throw new Error('Opportunité non trouvée');
      }
      const propertyStatus = propertyResult.rows[0].stat;
      if (propertyStatus === 'Vendu') {
        return 'Cette opportunité est déjà vendue.';
      }
  
      const opportunityValue = propertyResult.rows[0].value;
  
      // Étape 2 : Diviser la valeur de l'opportunité en 10
      const tokenValue = opportunityValue / 10;
  
      // Étape 3 : Insérer 10 tokens dans la table tokens
      const insertTokensQuery = {
        text: 'INSERT INTO tokens (owner_id, value, prop_id) VALUES ($1, $2, $3)',
        values: [userId, tokenValue, propId],
      };
  
      for (let i = 0; i < 10; i++) {
        await pool.query(insertTokensQuery);
      }
  
      // Étape 4 : Supprimer l'opportunité
      const updatePropertyQuery = {
        text: 'UPDATE props SET stat = $1 WHERE id = $2',
        values: ['Vendu', propId],
      };
  
      const deleteResult = await pool.query(updatePropertyQuery);
  
      if (deleteResult.rowCount === 0) {
        throw new Error('Opportunité non trouvée');
      }
  
      return 'Opportunité vendue avec succès';
    } catch (error) {
      throw new Error(`Erreur lors de la vente de l'opportunité : ${error.message}`);
    }
  }
  

  

  async function updateUserAsBuyer(userId) {
    try {
      // Requête SQL pour mettre à jour l'utilisateur en tant qu'acheteur
      const query = {
        text: 'UPDATE users SET is_buyer = true WHERE id = $1 RETURNING *',
        values: [userId],
      };
  
      const result = await pool.query(query);
  
      if (result.rowCount === 0) {
        throw new Error('Utilisateur non trouvé');
      }
  
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  }

  
  async function purchaseTokensAsBuyer(userId, tokenId) {
    try {
      // Requête SQL pour mettre à jour l'utilisateur en tant qu'acheteur
      const query = {
        text: 'UPDATE tokens SET owner_id = $1 WHERE id = $2 RETURNING *',
        values: [userId, tokenId],
      };
  
      const result = await pool.query(query);

      const name = `Un nouveau contrat de l'utilisateur : ${userId} sur le Token ${tokenId}`;

      const insertSmartContractsQuery = {
        text: 'INSERT INTO smart_contracts (owner_id, name) VALUES ($1, $2)',
        values: [userId,  name],
    };

    const result2 = await pool.query(insertSmartContractsQuery);
  
      if (result.rowCount === 0) {
        throw new Error('Utilisateur non trouvé');
      }
  
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  }

async function buyPropertyAsBuyer(userId, propId) {
    try {
      // Requête SQL pour mettre à jour l'utilisateur en tant qu'acheteur
      const query = {
        text: 'UPDATE props SET stat = $1, seller = $2 WHERE id = $3 RETURNING *',
        values: ['Achetée', userId, propId],
      };
  
      const result = await pool.query(query);

      const name = `Un nouveau contrat de ${userId} sur le bien ${propId}`;

      const insertSmartContractsQuery = {
        text: 'INSERT INTO smart_contracts (owner_id, prop_id, name) VALUES ($1, $2, $3)',
        values: [userId, propId, name],
    };

    const result2 = await pool.query(insertSmartContractsQuery);
  
      if (result.rowCount === 0) {
        throw new Error('Utilisateur non trouvé');
      }
  
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  }
  
  // Méthode pour mettre à jour l'utilisateur en tant que vendeur
  async function updateUserAsSeller(userId) {
    try {
      // Requête SQL pour mettre à jour l'utilisateur en tant que vendeur
      const query = {
        text: 'UPDATE users SET is_seller = true WHERE id = $1 RETURNING *',
        values: [userId],
      };
  
      const result = await pool.query(query);
  
      if (result.rowCount === 0) {
        throw new Error('Utilisateur non trouvé');
      }
  
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  }




module.exports = {
  getTokensByOwnerId,
  updateUserAsBuyer,
  updateUserAsSeller,
  getContractsByOwnerId,
  getAvailableTokensByUserId,
  getAllPropByOwnerId,
  getAvailablePropByOwnerId,
  buyPropertyAsBuyer,
  purchaseTokensAsBuyer,
  sellPropertyAsSeller,
};
