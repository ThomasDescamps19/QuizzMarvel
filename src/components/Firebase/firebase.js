// Importations nécessaires depuis Firebase SDK v9+
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"; // Importer les méthodes d'authentification

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhl5xeDaymwkJKgWXmb4iBqi6wy59ZNrU",
  authDomain: "marvel-quiz-5156e.firebaseapp.com",
  projectId: "marvel-quiz-5156e",
  storageBucket: "marvel-quiz-5156e.appspot.com",
  messagingSenderId: "544148304314",
  appId: "1:544148304314:web:3359849f530731f91ced83",
};

// Classe Firebase
class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig); // Initialisation de l'application Firebase
    this.auth = getAuth(this.app); // Initialisation du service d'authentification
  }

  // inscription
  signupUser = (email, password) => {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // L'utilisateur est inscrit avec succès
        return userCredential;
      })
      .catch((error) => {
        // Gérer l'erreur ici
        console.error("Erreur d'inscription:", error);
        throw error;
      });
  };

  // Connexion
  loginUser = (email, password) => {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // L'utilisateur est connecté avec succès
        return userCredential;
      })
      .catch((error) => {
        // Gérer l'erreur ici
        console.error("Erreur de connexion:", error);
        throw error;
      });
  };

  // Deconnexion
  signoutUser = () => {
    return signOut(this.auth)
      .then(() => {
        // Déconnexion réussie
        console.log("Déconnexion réussie");
      })
      .catch((error) => {
        // Gérer l'erreur ici
        console.error("Erreur de déconnexion:", error);
        throw error;
      });
  };
}

export default Firebase;
