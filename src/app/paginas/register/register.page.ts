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
  formularioRegister: FormGroup;

// correo:string=""
// password:string=""
// usuario:string=""
constructor(public fb:FormBuilder,public mensaje:ToastController, private route:Router, public alerta:AlertController, public navCtrl:NavController) {
  this.formularioRegister = this.fb.group({
    'usuario':new FormControl("",Validators.required),
    'correo':new FormControl("",Validators.required),
    'password':new FormControl("",Validators.required),
    'confirmPassword':new FormControl("",Validators.required)
 
  })
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

async  registrarse(){
  var f=this.formularioRegister.value;
  if(this.formularioRegister.invalid){
    this.MensajeError()
  }
  else{this.MensajeExito()}

  var usuario ={
    usuario:f.usuario,
    correo:f.correo,
    password:f.password
  }

  // aqui es donde se guardan los datos en local
  localStorage.setItem('usuario', JSON.stringify(usuario))

}




ngOnInit() {
}
}



// // de momento esta sin uso
// registrar(){
// if (this.correo ==="" || this.password==="" || this.usuario==="") {
//   console.log("No pueden haber espacios en blanco")
//   this.MensajeError()
//   }
// else {console.log("Creación de cuenta con éxito")
//   this.MensajeExito()
//   this.route.navigate(["/login"]) 

// } 
// }