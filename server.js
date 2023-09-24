

const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./src/api/schema'); // Votre schéma GraphQL
const resolvers = require('./src/api/resolvers'); // Vos résolveurs GraphQL

const schema = makeExecutableSchema({ typeDefs, resolvers });

const express = require('express');
const session = require('express-session'); // Importez express-session
const app = express();
app.use(express.json());

const port = 3000;

app.use(express.urlencoded({ extended: false }));

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tirok_db',
  password: 'sidi',
  port: '5432',
});

// Utilisez express-session pour gérer les sessions
app.use(session({
  secret: 'votre_clé_secrète', // Une chaîne secrète pour sécuriser les cookies de session
  resave: false,
  saveUninitialized: true,
}));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  console.log(req.session.authenticated);
  if (req.session.authenticated) {
    res.sendFile(__dirname + '/public/index.html');
  } else {
    res.sendFile(__dirname + '/public/login.html');
  }
});

// Route pour gérer la soumission du formulaire de connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = {
    text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
    values: [email, password],
  };

  pool.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    if (result.rows.length > 0) {
      console.log("Identifiants corrects");
      req.session.authenticated = true; // Définissez la session comme authentifiée
      req.session.user = result.rows[0];
      res.redirect('/');
    } else {
      res.status(401).send('Identifiants incorrects');
    }
  });
});

// Route pour la déconnexion
app.get('/logout', (req, res) => {
    req.session.authenticated = false; // Déconnexion de l'utilisateur
    res.redirect('/');
  });

  app.use('/graphql', graphqlHTTP((req, res) => ({
    schema,
    context: { user: req.session.authenticated ? req.session.user : null }, // Passez l'utilisateur connecté au contexte GraphQL
    graphiql: true, // Activez l'interface graphique GraphQL (pour le débogage)
  })));

  app.get('/getUserId', (req, res) => {
    if (req.session && req.session.user) {
        const userId = req.session.user.id;
        res.json({ userId: Number(userId) }); // Renvoyez l'ID en tant que nombre entier
    } else {
        res.status(401).json({ error: 'Utilisateur non authentifié' });
    }
});

app.post("/acheter-bien", (req, res) => {
    try {
      // Récupérez l'identifiant du bien à partir des données JSON de la demande
      const bienId = req.body.bienId;
  
      // Effectuez le traitement de la demande d'achat ici, par exemple, en mettant à jour la base de données
      // Vous pouvez ajouter votre logique métier ici
  
      // Répondez avec un message de succès
      console.log(bienId); 
      res.status(200).json({ message: "Demande d'achat réussie." });
    } catch (error) {
      console.error("Erreur lors du traitement de la demande d'achat : ", error);
      // Répondez avec un code d'erreur en cas d'échec
      res.status(500).json({ error: "Une erreur s'est produite lors du traitement de la demande d'achat." });
    }
  });


  

app.listen(port, () => {
  console.log(`Serveur Express écoutant sur le port ${port}`);
});
