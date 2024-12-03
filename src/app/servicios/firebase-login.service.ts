import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(public ngFireAuth: AngularFireAuth, private router: Router) { }

  // Creación de usuario
  async registerUser(email: string, password: string, fullname: any) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Login de usuario
  async loginUser(email: string, password: string,fullname: any) {
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

  // Obtener perfil 
  async getProfile():Promise <User | null> {
    return new Promise<User | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged((user: any) => {
        if (user) {
          resolve(user as User);
        } else {
          resolve(null);
        }
      }, reject);
    })
  }

  
}
