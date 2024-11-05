import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl,
  Validators,FormBuilder } from '@angular/forms';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  

  constructor(public fb:FormBuilder,public loadingCtrl: LoadingController, public mensaje:ToastController, private router:Router, public alerta:AlertController, public navCtrl:NavController, public authService:FirebaseLoginService ) {
 
   }
   ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [
        
        Validators.required,
        Validators.minLength(8),]],
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    // console.log(this.email + this.password);
    if (this.loginForm.valid) {

      // loading.dismiss();
      const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((err) => {
        this.presentToast(err)
        console.log(err);
        loading.dismiss();
      })

      if (user) {
        loading.dismiss();
        this.router.navigate(
          ['/home'])
      }
    } else {
      return console.log('Por favor rellena todos los espacios');
    }

  }

  get errorControl() {
    return this.loginForm.controls;
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
 




 
}