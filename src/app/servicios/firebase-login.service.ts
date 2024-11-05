import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(public ngFireAuth:AngularFireAuth, private router:Router) { }
  //creacion usuario
async registerUser(email:string,password:string, fullname:any){
  return await this.ngFireAuth.createUserWithEmailAndPassword(email,password);
}
   //login usuario
async loginUser(email:string,password:string){
  return await this.ngFireAuth.signInWithEmailAndPassword(email,password);
}
 //recuperacion usuario
async resetPassword(email:string){
  await this.ngFireAuth.sendPasswordResetEmail(email);
}
//signOut de usuario
async signOut(){
  return await this.ngFireAuth.signOut()
}
async getProfile(){
  return await this.ngFireAuth.currentUser;
}


  // login(email:string,password:string){
  //   return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  // }
  // logout(){
  //   return this.ngFireAuth.signOut().then(()=>{
  //     this.router.navigate(['/login']);
  //   })
  // }
}
