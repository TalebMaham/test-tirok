// resolvers.js
const {
    getTokensByOwnerId,
    updateUserAsBuyer, // Assurez-vous d'importer cette fonction
    updateUserAsSeller,
    getContractsByOwnerId,
    getAvailableTokensByUserId,
    getAllPropByOwnerId,
    getAvailablePropByOwnerId,
    buyPropertyAsBuyer,
    purchaseTokensAsBuyer,
    sellPropertyAsSeller, 
  } = require('./tmp');
const resolvers = {
    Query: {
        // ...
    
        // Résolveur pour récupérer tous les tokens de l'utilisateur
        getAllTokens: async (_, __, { user }) => {
          if (!user) {
            throw new Error('Vous devez être connecté pour accéder à cette ressource.');
          }
    
          // Utilisez votre base de données pour récupérer les tokens de l'utilisateur
          const tokens = await getTokensByOwnerId(user.id);
    
          return tokens;
        },


        getAvailableTokens: async (_, __, { user }) => {
            if (!user) {
              throw new Error('Vous devez être connecté pour accéder à cette ressource.');
            }
      
            // Utilisez votre base de données pour récupérer les tokens de l'utilisateur
            const tokens = await getAvailableTokensByUserId(user.id);
      
            return tokens;
          },

        getAllSmartContracts : async (_, __, { user }) => {
            if (!user) {
              throw new Error('Vous devez être connecté pour accéder à cette ressource.');
            }
      
            // Utilisez votre base de données pour récupérer les tokens de l'utilisateur
            const tokens = await getContractsByOwnerId(user.id);
      
            return tokens;
          },

          getAllProp : async (_, __, { user }) => { 
            if (!user) {
              throw new Error('Vous devez être connecté pour accéder à cette ressource.');
            }
      
            // Utilisez votre base de données pour récupérer les tokens de l'utilisateur
            const tokens = await getAllPropByOwnerId(user.id);
      
            return tokens;
          },

          getAvailableProp : async (_, __, { user }) => {
            if (!user) {
              throw new Error('Vous devez être connecté pour accéder à cette ressource.');
            }
      
            // Utilisez votre base de données pour récupérer les tokens de l'utilisateur
            const tokens = await getAvailablePropByOwnerId(user.id);
      
            return tokens;
          },
       


      },
      Mutation: {

        sellProperty: async (_, { propId },  { user }) => {
            if (!user) {
                
                console.log("Nous sommes ici et le user n'est pas connecté "); 
                throw new Error('Vous devez être connecté pour effectuer cette action.');
              }
        
            const updatedUd = await sellPropertyAsSeller(user.id, propId);            
        
          },



        purchaseTokens: async (_, { tokenId },  { user }) => {
            if (!user) {
                
                console.log("Nous sommes ici et le user n'est pas connecté "); 
                throw new Error('Vous devez être connecté pour effectuer cette action.');
              }
        
            const updatedUd = await purchaseTokensAsBuyer(user.id, tokenId);            
        
          },
       
        buyProperty: async (_, { propId }, { user }) => {
            console.log("Nous sommes ici"); 
            if (!user) {
                throw new Error('Vous devez être connecté pour effectuer cette action.');
              }
        

            const updatedUd = await buyPropertyAsBuyer(user.id, propId);            
        
          },
        // Résolveur pour définir l'utilisateur comme acheteur
        setUserAsBuyer: async (_, { userId }, { user }) => {
          if (!user) {
            throw new Error('Vous devez être connecté pour effectuer cette action.');
          }
    
          if (String(user.id) !== userId) {
            throw new Error('Vous n\'êtes pas autorisé à modifier le rôle de cet utilisateur.');
        }
        
          // Mettez à jour l'utilisateur dans la base de données en tant qu'acheteur
          // Remplacez cette ligne par la logique réelle pour mettre à jour l'utilisateur
          const updatedUser = await updateUserAsBuyer(user.id);
    
          return updatedUser;
        },
    
        // Résolveur pour définir l'utilisateur comme vendeur
        setUserAsSeller: async (_, { userId }, { user }) => {
          if (!user) {
            throw new Error('Vous devez être connecté pour effectuer cette action.');
          }
    
          // Vérifiez si l'utilisateur actuel a le droit de modifier le rôle de l'utilisateur
          if (String(user.id) !== userId) {
            throw new Error('Vous n\'êtes pas autorisé à modifier le rôle de cet utilisateur.');
        }
    
          // Mettez à jour l'utilisateur dans la base de données en tant que vendeur
          // Remplacez cette ligne par la logique réelle pour mettre à jour l'utilisateur
          const updatedUser = await updateUserAsSeller(user.id);
    
          return updatedUser;
        },
      },
  };



  
  module.exports = resolvers;
  