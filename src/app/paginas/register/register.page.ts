import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
correo:string=""
password:string=""
usuario:string=""
constructor(public mensaje:ToastController, private route:Router, public alerta:AlertController) { }
  
async MensajeExito() {
  const toast = await this.mensaje.create({
    message: 'Cuenta creada con éxito, inicia sesión',
    duration: 3000
  });
  toast.present();
}

async MensajeError() {
  const alert = await this.alerta.create({
    header: '',
    subHeader: 'Fallo al crear tu cuenta',
    message: 'Los datos ingresados no son válidos',
    buttons:['Aceptar']
  });
  await alert.present();
}
 
registrar(){
if (this.correo ==="" || this.password==="" || this.usuario==="") {
  console.log("No pueden haber espacios en blanco")
  this.MensajeError()
  }
else {console.log("Creación de cuenta con éxito")
  this.MensajeExito()
  this.route.navigate(["/login"]) 

} 
}

ngOnInit() {
}

}
