import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl,
  Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // formularioRegister: FormGroup;
  regForm: FormGroup | undefined;
// correo:string=""
// password:string=""
// usuario:string=""
constructor(public fb:FormBuilder,public mensaje:ToastController, private route:Router, public alerta:AlertController, public navCtrl:NavController) {
 
}
  
async MensajeExito() {
  const toast = await this.mensaje.create({
    message: 'Cuenta creada con éxito, inicia sesión',
    duration: 3000
  });
  toast.present();
}

async MensajeError() {
  const alert = await this.alerta.create({
    header: 'Fallo al crear tu cuenta',
    subHeader: '',
    message: 'Datos incompletos',
    buttons:['Aceptar']
  });
  await alert.present();
  return;
}

// async  registrarse(){
//   var f=this.formularioRegister.value;
//   if(this.formularioRegister.invalid){
//     this.MensajeError()
//   }
//   else{this.MensajeExito()}

//   var usuario ={
//     usuario:f.usuario,
//     correo:f.correo,
//     password:f.password
//   }

//   // aqui es donde se guardan los datos en local
//   localStorage.setItem('usuario', JSON.stringify(usuario))

// }




ngOnInit() {
  this.regForm = this.fb.group({
    fullname:['',[Validators.required]],
    //ver pattern validators copy
    email:['',[Validators.required,Validators.email,Validators.pattern("^[0-9]*$")]],
    password:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
 
   }) 
}
}


