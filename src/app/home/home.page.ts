import { Component, viewChild} from '@angular/core';
import { Router } from '@angular/router';
import { IonFabList } from '@ionic/angular';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { ViewChild,ElementRef, } from '@angular/core';


declare var google:any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
user:any;
map: any;

@ViewChild('map',{read:ElementRef,static:false}) mapRef!: ElementRef;

  constructor(private route:Router,private router:Router,
    public authService:FirebaseLoginService
  ) {}

  ionViewDidEnter() {
    this.showMap(); // Mostrar el mapa cuando la vista esté cargada
  }

  showMap() {
    // Verifica que 'google' y 'google.maps' estén disponibles antes de acceder a ellos
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      console.error('Google Maps no está cargado');
      return;
    }

    // Definir la ubicación inicial del mapa
    const location = new google.maps.LatLng(-17.824858, 31.053028);

    // Opciones del mapa
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true, // Deshabilitar los controles predeterminados del mapa
    };

    // Crear el mapa
    this.map = new google.maps.Map(this.mapRef.nativeElement, options); // Usamos 'google.maps.Map'
  }







  ngOnInit() {
    this.user = this.authService.getProfile();
  }
  
async logOut(){
  this.authService.signOut().then(()=>{
    this.router.navigate(['/login'])
  }).catch((error)=>{
    console.log(error);
  })
}







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
