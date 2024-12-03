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
  email: string | null = null;
  fullname: string | null = null;
  
    constructor(private route:Router,
      public authService:FirebaseLoginService,
    ) {}
  
  async ngOnInit() {
    try {
      const user = await this.authService.getProfile();
      this.email = user?.email || null; 
    } catch (error) {
      console.error('Error obteniendo el perfil del usuario:', error);
    }
  }
  
  async logOut(){
  this.authService.signOut().then(()=>{
    this.route.navigate(['/login'])
  }).catch((error)=>{
    console.log(error);
  })
  }  
  }
  

