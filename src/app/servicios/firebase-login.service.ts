import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(public ngFireAuth: AngularFireAuth, private router: Router, private firestore:AngularFirestore) { }

  
   // Creación de usuario
   async registerUser(email: string, password: string, fullname: string) {
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      console.log("Usuario registrado:", userCredential);
  
      // Obtener el UID del usuario recién creado
      const uid = userCredential.user?.uid;
      if (uid) {
        // Guardar los datos del usuario en Firestore
        await this.firestore.collection('users').doc(uid).set({
          email: email,
          fullname: fullname,
          uid: uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Datos guardados en Firestore");
      } else {
        console.error("UID no disponible");
      }
  
      return userCredential;
    } catch (error) {
      console.error("Error en el registro", error);
      throw error;
    }
  }
  
      

  // Login de usuario
  async loginUser(email: string, password: string) {
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      console.error("Error de inicio de sesión", error);
      throw error;
    }
  }

  // Recuperación de contraseña
  async resetPassword(email: string) {
    await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  // Sign out de usuario
  async signOut() {
    return await this.ngFireAuth.signOut();
  }

  // Obtener perfil del usuario
  async getProfile(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged((user: any) => {
        if (user) {
          resolve(user as User);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }

  
}
