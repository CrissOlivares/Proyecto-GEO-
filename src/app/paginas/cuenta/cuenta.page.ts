import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  user:any;
  
    constructor(private route:Router,
      public authService:FirebaseLoginService,
    ) {}
  
   
    
    
  
  
  ngOnInit() {
    this.user = this.authService.getProfile();
  }
  
  async logOut(){
  this.authService.signOut().then(()=>{
    this.route.navigate(['/login'])
  }).catch((error)=>{
    console.log(error);
  })
  }
  
  
  
   
  
  
    salir(){
      this.route.navigate(["/login"]) 
    }
    cuenta(){
      this.route.navigate(["/cuenta"]) 
    }
    estadisticas(){
      this.route.navigate(["/estadisticas"]) 
    }
    sobre(){
      this.route.navigate(["/sobre"]) 
    }
  
    // test boton añadir
    add(){
      console.log('add')
      alert("añadir")
    }
    canceladd(){
      console.log('addcash')
    }
  
    
    
  }
  

