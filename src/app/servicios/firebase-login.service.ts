import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
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

      // Guardar en localStorage 
      if (userCredential.user) {
        const user = userCredential.user;
        const token = await user.getIdToken(); //  token de acceso
        localStorage.setItem('user', JSON.stringify(user));  // objeto del usuario
        localStorage.setItem('token', token);  // save  del token
      }

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
    try {
      await this.ngFireAuth.signOut();
      localStorage.removeItem('user'); // Eliminacion del objeto del userr
      localStorage.removeItem('token'); 
      this.router.navigate(['/login']); 
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      throw error;
    }
  }

  // Obtener perfil 
  getProfile() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user); // Devuelve el usuario desde localStorage
    } else {
      return null; 
    }
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user !== null; // Si existe el usuario en localStorage, está logueado
  }

  
}
