import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  markers: any[] = [];

  constructor(private route: Router, private authService: FirebaseLoginService) { }

  salir() {
    this.route.navigate(["/home"]);
  }

  async ngOnInit() {
    try {
      const user = await this.authService.getProfile();
      if (user) {
        const uid = user.uid;
        this.markers = await this.authService.getUserExpenses(uid);
        console.log('Marcas obtenidas:', this.markers);
      } else {
        console.error('Usuario no autenticado');
        alert('Debes iniciar sesión para ver las estadísticas.');
      }
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  }

  clearMarkers() {
    // No es necesario eliminar de localStorage ya que ahora estamos usando Firestore
    this.markers = [];
    alert('Todas las marcas han sido borradas');
  }
}



  