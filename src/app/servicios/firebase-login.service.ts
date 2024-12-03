import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/compat/firestore';
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
  //guarda los datos
  async saveUserData(uid: string, data: any) {
    try {
      await this.firestore.collection('users').doc(uid).collection('expenses').add(data);
      console.log('Datos guardados correctamente en Firestore.');
    } catch (error) {
      console.error('Error al guardar los datos en Firestore:', error);
      throw error;
    }
  }
  //agregar
  async getUserExpenses(uid: string): Promise<any[]> {
    try {
      const expensesSnapshot = await this.firestore
        .collection('users')
        .doc(uid)
        .collection('expenses')
        .get()
        .toPromise();
  
      // Verificar si expensesSnapshot es undefined
      if (!expensesSnapshot) {
        console.error('No se encontraron gastos o ocurrió un error');
        return [];
      }
  
      // Asegurarse de incluir el ID del documento
      const expenses = expensesSnapshot.docs.map(doc => ({
        id: doc.id,  // Guardar el ID del documento
        ...doc.data()  // Y los datos asociados
      }));
      console.log('Gastos del usuario:', expenses);
      return expenses;
    } catch (error) {
      console.error('Error al obtener los gastos:', error);
      throw error;
    }
  }
  //editar
  async updateExpense(uid: string, expenseId: string, updatedData: any): Promise<void> {
    try {
      await this.firestore
        .collection('users')
        .doc(uid)
        .collection('expenses')
        .doc(expenseId)
        .update(updatedData);
      console.log('Gasto actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el gasto:', error);
      throw error;
    }
  }
//eliminar
  async deleteExpense(uid: string, expenseId: string): Promise<void> {
    try {
      await this.firestore
        .collection('users')
        .doc(uid)
        .collection('expenses')
        .doc(expenseId)
        .delete();
      console.log('Gasto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
      throw error;
    }
  }
}
