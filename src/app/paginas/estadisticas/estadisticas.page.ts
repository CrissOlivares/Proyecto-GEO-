import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  markers: any[] = [];

  constructor(private route:Router) { }


  salir(){
    this.route.navigate(["/home"]) 
  }
  ngOnInit() {
    // Recuperar las marcas guardadas en localStorage
    const storedMarkers = JSON.parse(localStorage.getItem('markers') || '[]');
    this.markers = storedMarkers;  // Asignar las marcas al array
  }

  clearMarkers() {
    localStorage.removeItem('markers');
    this.markers = [];
    alert('Todas las marcas han sido borradas');
  }

}



  