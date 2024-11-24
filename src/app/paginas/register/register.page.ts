import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl,
  Validators,FormBuilder } from '@angular/forms';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // formularioRegister: FormGroup;
  ionicForm!: FormGroup ;

constructor(public fb:FormBuilder,public loadingCtrl: LoadingController, public mensaje:ToastController, private router:Router, public alerta:AlertController, public navCtrl:NavController, public authService:FirebaseLoginService ) {
  

}
  
ngOnInit() {this.ionicForm = this.fb.group({
  fullname:['',
    [Validators.required]
  ],
  email: ['',
    [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ],
  ],
  password: ['', [
    
    Validators.required,
    Validators.minLength(8),]],
    
  
})
 //termino validaciones
}

get errorControl(){
  return this.ionicForm.controls;
}

async signUP(){
  const loading = await this.loadingCtrl.create();
  await loading.present();
  if (this.ionicForm.valid) {

    const user = await this.authService.registerUser(this.ionicForm.value.email, this.ionicForm.value.password, this.ionicForm.value.password).catch((err: undefined) => {
      this.presentToast(err)
      console.log(err);
      loading.dismiss();
    })

    if (user) {
      loading.dismiss();
      this.router.navigate(['/login'])
    }
  } else {
    loading.dismiss();
    this.MensajeError();
    return console.log('Por favor rellena todos los espacios');
  }
}

async presentToast(message: undefined) {
  console.log(message);
  
  const toast = await this.mensaje.create({
    message: message,
    duration: 1500,
    position: 'top',
  });

  await toast.present();
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










}