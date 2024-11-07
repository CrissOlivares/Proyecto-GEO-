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
marker: any;
  markerNumber: number | undefined; 
  isMarkingEnabled: boolean = false; 


@ViewChild('map',{read:ElementRef,static:false}) mapRef!: ElementRef;


  constructor(private route:Router,
    public authService:FirebaseLoginService,
  ) {}

  ionViewDidEnter() {
    this.showMap(); 
  }


  
  // Método para obtener y mostrar el mapa
  showMap() {
    // Verifica que 'google' y 'google.maps' estén disponibles antes de acceder a ellos
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      console.error('Google Maps no está cargado');
      return;
    }

    // obtener la ubicación actual
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
            center: location, //ubicación actual como el centro
            zoom: 15,
            disableDefaultUI: true, 
          };

          // Crea el mapa
          this.map = new google.maps.Map(this.mapRef.nativeElement, options);

          // marcador en la ubicación actual
          new google.maps.Marker({
            position: location,
            map: this.map,
            title: 'Ubicación actual',
          });
        },
        (error) => {
          console.error('Error al obtener la ubicación: ', error);
          //ubicacion por defecto
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
      // Si la geolocalización no está disponible, ubicación predeterminada
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



    
// Método para habilitar el modo de marcado
enableMarking() {
  this.isMarkingEnabled = true;
  this.addClickListener();
}
// Método que permite agregar un marcador al mapa
addClickListener() {
  if (this.isMarkingEnabled) {
    google.maps.event.addListener(this.map, 'click', (event: any) => {
      const clickedLocation = event.latLng;
      
      // Obtener latitud y longitud de la ubicación clickeada
      const latitude = clickedLocation.lat();
      const longitude = clickedLocation.lng();

      // Crear el marcador en la ubicación clickeada
      this.marker = new google.maps.Marker({
        position: clickedLocation,
        map: this.map,
        title: `Marcador - Número: ${this.markerNumber}`,
      });

      // Mostrar un mensaje de confirmación con el número ingresado
      if (this.markerNumber !== undefined) {
        // Recuperar las marcas almacenadas en localStorage, si existen
        const storedMarkers = JSON.parse(localStorage.getItem('markers') || '[]');
        
        // Agregar la nueva marca con la ubicación y el precio
        storedMarkers.push({
          lat: latitude,
          lng: longitude,
          price: this.markerNumber,
        });

        // Guardar las marcas actualizadas en localStorage
        localStorage.setItem('markers', JSON.stringify(storedMarkers));

        // Mostrar alerta con la ubicación y el precio
        alert(`Haz gastado en: ${clickedLocation.toString()} Un total de: $${this.markerNumber}`);
      } else {
        alert('Debes marcar el precio antes de marcar el lugar');
      }

      // Deshabilitar la opción de marcar lugar después de colocar el marcador
      this.isMarkingEnabled = false;
    });
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
