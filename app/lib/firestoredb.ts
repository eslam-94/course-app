
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"; 
import { FireUser } from "./definitions";
import bcrypt from 'bcrypt'
import { db } from "./firestoresetting";

// Fetch user from FireStore db
export async function getFireUser(email: string): Promise<FireUser | undefined> {

  const q = query(collection(db, "users"), where("email", "==", email));

  try {

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0].data() as FireUser

  } catch (error) {

    console.error('Failed to fetch user:', error);

  }
}

// Save new user to FireStore db
export async function registerFireUser(user: FireUser) {
  
  const hashedPassword = await bcrypt.hash(user.password, 10);
  
  user.password = hashedPassword

  const usersRef = collection(db, "users");

  try {

    await setDoc(doc(usersRef), user)

    return true

  } catch (error) {
    
    console.error('Error register user');

    return false

  }
}

// Update password in FIreStore db after reset
export async function updateFireUserPass(email: string, password: string) {

  const q = query(collection(db, "users"), where("email", "==", email));

  try {

    const querySnapshot = await getDocs(q);

    const userId = querySnapshot.docs[0].id
    
    const userRef = doc(db, 'users', userId);

    const hashedNewPassword = await bcrypt.hash(password, 10);
        
    setDoc(userRef, { password: hashedNewPassword }, { merge: true });

    return true
  
  } catch (error) {

    console.error('Error updating password user');

    return false
  
  }
}