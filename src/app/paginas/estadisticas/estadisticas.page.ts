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
  total: number = 0;

  constructor(private route: Router, private authService: FirebaseLoginService) { }

  salir() {
    this.route.navigate(["/home"]);
  }
  recarga() {
    window.location.reload();
  }
// Formatear la fecha y hora desde Firestore
  formatDate(date: any): string {
    const formattedDate = new Date(date.seconds * 1000);  // Convertir el timestamp de Firestore
    return formattedDate.toLocaleString();  // Formatear la fecha en una cadena legible
  }
  async ngOnInit() {
    try {
      const user = await this.authService.getProfile();
      if (user) {
        const uid = user.uid;
        this.markers = await this.authService.getUserExpenses(uid);
        console.log('Marcas obtenidas:', this.markers);
        this.calculateTotal(); // Llamamos a la función para calcular el total
      } else {
        console.error('Usuario no autenticado');
        alert('Debes iniciar sesión para ver las estadísticas.');
      }
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  }

  clearMarkers() {
    this.markers = [];
    this.total = 0;  // Restablecer el total
    alert('Todas las marcas han sido borradas');
  }

  async editExpense(marker: any, index: number) {
    const updatedPrice = prompt('Nuevo precio:', marker.price.toString());
    if (updatedPrice) {
      // Asegúrate de que el precio es un número válido
      const updatedData = {
        price: parseFloat(updatedPrice),
        timestamp: marker.timestamp  // Mantener el timestamp original
      };

      const user = await this.authService.getProfile();
      if (user) {
        const uid = user.uid;
        const expenseId = marker.id; // Asegúrate de que tienes un ID único para cada gasto
        await this.authService.updateExpense(uid, expenseId, updatedData);

        // Actualizar la lista de gastos localmente
        this.markers[index].price = updatedData.price;
        this.markers[index].timestamp = updatedData.timestamp;

        this.calculateTotal();  // Recalcular el total
        alert('Gasto actualizado con éxito');
      } else {
        console.error('Usuario no autenticado');
      }
    }
  }

  async deleteExpense(marker: any, index: number) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este gasto?');
    if (confirmation) {
      const user = await this.authService.getProfile();
      if (user) {
        const uid = user.uid;
        const expenseId = marker.id; // Asegúrate de tener un ID único
        await this.authService.deleteExpense(uid, expenseId);

        
        this.calculateTotal();  // Recalcular el total
        alert('Gasto eliminado con éxito  ');
      } else {
        console.error('Usuario no autenticado');
      }
    }
  }

  calculateTotal() {
    // Sumar todos los precios de las marcas
    this.total = this.markers.reduce((sum, marker) => sum + marker.price, 0);
  }
}


  