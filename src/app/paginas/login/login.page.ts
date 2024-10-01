import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl,
  Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
formularioLogin: FormGroup;

  // // correo:string=""
  // // password:string=""

  constructor(public fb:FormBuilder, public mensaje:ToastController, private route:Router, public alerta:AlertController) {
    this.formularioLogin = this.fb.group({
      'usuario':new FormControl("",Validators.required),
      'correo':new FormControl("",Validators.required),
      'password':new FormControl("",Validators.required)
    })
   }
  
  async MensajeExito() {
    const toast = await this.mensaje.create({
      message: 'Ingresando...',
      duration: 1500
    });
    toast.present();
  }

  async MensajeError() {
    const alert = await this.alerta.create({
      header: 'Error al iniciar',
      subHeader: '',
      message: 'Las credenciales no son válidas, intentalo de nuevo',
      buttons:['Aceptar']
    });
    await alert.present();
}
   
// ingresa(){
//   if (this.correo ==="" || this.password==="") {
//     console.log("No pueden haber espacios en blanco")
    
//     }
//   if (this.correo ==="admin@admin" && this.password==="6818") {
//     console.log("Inicio exitoso")
//     this.MensajeExito()
//     this.route.navigate(["/home"])  
//   } else {this.MensajeError()
  
//   } 
//   }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);
      if (usuario.correo == f.correo && usuario.password == f.password) {
        localStorage.setItem('ingresado', 'true');
        this.MensajeExito();
      } else {
        this.MensajeError();
        };
        
      }
    }

  }
 

