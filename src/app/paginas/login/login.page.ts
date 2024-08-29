import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario:string=""
  password:string=""

  constructor(public mensaje:ToastController, private route:Router, public alerta:AlertController) { }
  
  async MensajeExito() {
    const toast = await this.mensaje.create({
      message: 'Ingresando...',
      duration: 1500
    });
    toast.present();
  }

  async MensajeError() {
    const alert = await this.alerta.create({
      header: 'Error',
      subHeader: 'Error en el inicio de sesion',
      message: 'El inicio de sesion fallo',
      buttons:['Aceptar']
    });
    await alert.present();
}
   
ingresar(){
  if (this.usuario ==="" || this.password==="") {
    console.log("No pueden haber espacios en blanco")
    
    }
  if (this.usuario ==="admin" && this.password==="6818") {
    console.log("Inicio exitoso")
    this.MensajeExito()
    this.route.navigate(["/home"])  
  } else {this.MensajeError()
  
  } 
  }

  ngOnInit() {
  }

}
