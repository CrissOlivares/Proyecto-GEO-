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
          const defaultLocation = new google.maps.LatLng();
          const options = {
            center: defaultLocation,
            zoom: 15,
            disableDefaultUI: true,
          };
          this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        }
      );
    } else {
      console.error('Geolocalización no es compatible');
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
    google.maps.event.addListener(this.map, 'click', async (event: any) => {
      const clickedLocation = event.latLng;

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ location: clickedLocation }, async (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          const placeName = results[0].formatted_address;

          this.marker = new google.maps.Marker({
            position: clickedLocation,
            map: this.map,
            title: placeName,
          });

          // Mostrar pop-up para que el usuario ingrese el precio
          const price = prompt(`Ingresa el precio para el lugar:  ${placeName}`);

          if (price && !isNaN(Number(price))) {
            this.markerNumber = Number(price);  // Guardamos el precio

            const data = {
              lat: clickedLocation.lat(),
              lng: clickedLocation.lng(),
              price: this.markerNumber,
              placeName: placeName,
              timestamp: new Date(),  // Captura la fecha y hora actual
            };

            // Guardar en Firestore
            const user = await this.authService.getProfile();
            if (user) {
              const uid = user.uid;
              await this.authService.saveUserData(uid, data);
            } else {
              console.error('Usuario no autenticado.');
            }

            // Guardar en localStorage como respaldo
            const storedMarkers = JSON.parse(localStorage.getItem('markers') || '[]');
            storedMarkers.push(data);
            localStorage.setItem('markers', JSON.stringify(storedMarkers));

            
          } else {
            alert('Debes ingresar un precio válido para que se almacene.');
          }

          this.isMarkingEnabled = false;
        } else {
          console.error('No se pudo obtener el nombre del lugar:', status);
          alert('No se pudo obtener el nombre del lugar.');
        }
      });
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
  
}
