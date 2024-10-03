import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  NavController,
  ToastController, 
} from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

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
  constructor(
    public fb: FormBuilder,
    public mensaje: ToastController,
    public username: ToastController,
    private route: Router,
    public alerta: AlertController,
    public navCtrl: NavController
  ) {
    this.formularioRegister = this.fb.group({
      usuario: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  async MensajeExito() {
    const toast = await this.mensaje.create({
      message: 'Cuenta creada con éxito, inicia sesión',
      duration: 3000,
    });
    toast.present();
  }

  async RegUser() {
    const toast = await this.username.create({
      message: 'Debe contener un largo de 25 caracteres',
      duration: 3000,
    });
    toast.present();
  }

  async MensajeError() {
    const alert = await this.alerta.create({
      header: 'Fallo al crear tu cuenta',
      subHeader: '',
      message: 'Datos incompletos',
      buttons: ['Aceptar'],
    });
    await alert.present();
    return;
  }

  async registrarse() {
    var f = this.formularioRegister.value;
    if (this.formularioRegister.invalid) {
      this.MensajeError();
    } else {
      this.MensajeExito();
    }

    var usuario = {
      usuario: f.usuario,
      correo: f.correo,
      password: f.password,
    };

    // aqui es donde se guardan los datos en local
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  validateEmail(email: string): boolean { // mail debe contener @ y un .
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  validatePassword(password: string): boolean { // la contraseña para que contenga letras mayus y numeros 
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
  }

  /*register() {
    if (this.username.trim() === '') {
      console.log('Missing username');
      this.missingInputsToast();
    } else if (this.password.trim() === '') {
      console.log('Missing password');
      this.missingInputsToast();
    } else if (this.email.trim() === '') {
      console.log('Missing email');
      this.missingInputsToast();
    } else if (this.username.length > 25) {
      console.log('Username too long');
      this.usernameErrorToast();
    } else if (!this.validateEmail(this.email)) {
      console.log('Invalid email');
      this.emailErrorToast();
    } else if (this.password.length < 12) {
      console.log('Password too short');
      this.passwordLenghtErrorToast();
    } else if (!this.validatePassword(this.password)) {
      console.log('Password does not meet requirements');
      this.passwordContentsErrorToast();
    } else {
      console.log('User registered successfully');
      this.userService.setUserName(this.username); // Almacenar el nombre de usuario
      this.redirectHome();
    }*/
  }

  ngOnInit() {}
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
