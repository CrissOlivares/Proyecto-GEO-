import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-resetear-pass',
  templateUrl: './resetear-pass.page.html',
  styleUrls: ['./resetear-pass.page.scss'],
})
export class ResetearPassPage implements OnInit {
email:any
  constructor(public authService: FirebaseLoginService, public route:Router) {}

  ngOnInit() {
   
  }
  async resetPassword(){
  this.authService.resetPassword(this.email).then(()=>
    this.route.navigate(['/login']))
}

}
