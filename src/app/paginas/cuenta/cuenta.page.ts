import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  constructor(private route:Router,private router:Router,public authService:FirebaseLoginService) { }


  async logOut(){
    this.authService.signOut().then(()=>{
      this.router.navigate(['/login'])
    }).catch((error)=>{
      console.log(error);
    })
  }

  ngOnInit() {
  }

}

