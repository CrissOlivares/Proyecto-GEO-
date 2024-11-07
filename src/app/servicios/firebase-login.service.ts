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

      // Guardar en localStorage (puedes guardar lo que necesites, por ejemplo, el UID y token)
      if (userCredential.user) {
        const user = userCredential.user;
        const token = await user.getIdToken(); // Obtienes el token de acceso
        localStorage.setItem('user', JSON.stringify(user));  // Guardamos el objeto del usuario
        localStorage.setItem('token', token);  // Guardamos el token
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
      localStorage.removeItem('user'); // Eliminamos el objeto del usuario
      localStorage.removeItem('token'); // Eliminamos el token
      this.router.navigate(['/login']); // Redirigimos al login
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      throw error;
    }
  }

  // Obtener perfil (ejemplo de cómo acceder a los datos del usuario en localStorage)
  getProfile() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user); // Devuelve el usuario desde localStorage
    } else {
      return null; // Si no está logueado, no hay usuario
    }
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user !== null; // Si existe el usuario en localStorage, está logueado
  }
}
