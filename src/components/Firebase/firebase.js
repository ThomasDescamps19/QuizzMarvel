import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Importer Firestore
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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
    this.db = getFirestore(this.app); // Initialisation de Firestore
  }

  // Inscription
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

  // Déconnexion
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

  // Récupérer le mot de passe
  passwordReset = (email) => {
    return sendPasswordResetEmail(this.auth, email)
      .then(() => {
        console.log("Email de réinitialisation envoyé avec succès");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'envoi de l'email de réinitialisation :",
          error
        );
        throw error;
      });
  };

  // Ajouter l'utilisateur dans Firestore
  addUser = (uid, data) => {
    return setDoc(doc(this.db, "users", uid), data); // Utilisation correcte de doc() pour Firestore
  };

  // Référence à un utilisateur
  user = (uid) => doc(this.db, "users", uid); // Utilisation correcte de doc()
}

export default Firebase;
