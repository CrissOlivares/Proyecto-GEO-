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


  constructor(private route:Router,
    public authService:FirebaseLoginService
  ) {}

  ionViewDidEnter() {
    this.showMap(); // Mostrar el mapa cuando la vista esté cargada
  }

  // Método para obtener y mostrar el mapa
  showMap() {
    // Verifica que 'google' y 'google.maps' estén disponibles antes de acceder a ellos
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      console.error('Google Maps no está cargado');
      return;
    }

    // Intentamos obtener la ubicación actual
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Obtiene las coordenadas de la ubicación actual
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Crear el objeto LatLng con la ubicación actual
          const location = new google.maps.LatLng(latitude, longitude);

          // Opciones del mapa
          const options = {
            center: location, // Usamos la ubicación actual como el centro
            zoom: 15,
            disableDefaultUI: true, // Deshabilitar los controles predeterminados del mapa
          };

          // Crear el mapa
          this.map = new google.maps.Map(this.mapRef.nativeElement, options);

          // Agregar un marcador en la ubicación actual
          new google.maps.Marker({
            position: location,
            map: this.map,
            title: 'Ubicación actual',
          });
        },
        (error) => {
          console.error('Error al obtener la ubicación: ', error);
          // Si no se puede obtener la ubicación, podemos mostrar una ubicación por defecto
          const defaultLocation = new google.maps.LatLng(-17.824858, 31.053028);
          const options = {
            center: defaultLocation,
            zoom: 15,
            disableDefaultUI: true,
          };
          this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        }
      );
    } else {
      console.error('Geolocalización no es compatible con este navegador');
      // Si la geolocalización no está disponible, usamos una ubicación predeterminada
      const defaultLocation = new google.maps.LatLng(-17.824858, 31.053028);
      const options = {
        center: defaultLocation,
        zoom: 15,
        disableDefaultUI: true,
      };
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    }
  }
  updateLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const location = new google.maps.LatLng(latitude, longitude);
  
          // Actualizar la ubicación del mapa
          this.map.setCenter(location);
          this.map.setZoom(15);
  
          
        },
        (error) => {
          console.error('Error al obtener la ubicación: ', error);
          alert('No se pudo obtener la ubicación.');
        }
      );
    } else {
      console.error('Geolocalización no es compatible con este navegador');
    }
  }
    

  






  ngOnInit() {
    this.user = this.authService.getProfile();
  }
  
async logOut(){
  this.authService.signOut().then(()=>{
    this.route.navigate(['/login'])
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
