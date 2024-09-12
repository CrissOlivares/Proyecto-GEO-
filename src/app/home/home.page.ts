import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { IonFabList } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private route:Router) { }


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
