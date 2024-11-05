import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { IonFabList } from '@ionic/angular';
import { FirebaseLoginService } from '../servicios/firebase-login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
user:any;
  constructor(private route:Router,private router:Router,public authService:FirebaseLoginService) { 
    
  }

  ngOnInit() {
    this.user = this.authService.getProfile();
  }
  
async logOut(){
  this.authService.signOut().then(()=>{
    this.router.navigate(['/login'])
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
