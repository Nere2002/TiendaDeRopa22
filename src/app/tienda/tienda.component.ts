import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import * as Chart from 'chart.js';

interface Producto {
  id:number;
  talla: string;
  color: string;
  precio: number;
}
interface Datos{
  id:number;
  id_producto:number;
  num_comparaciones:number;
}
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
//export class TiendaComponent implements OnInit {
  export class TiendaComponent  {

  constructor(private http: HttpClient) { }
  // --------------------- GRAFICO ------------------------------------
/*  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/datos-para-grafico').subscribe((data) => {
      const labels = data.map((d) => d.mes);
      const values = data.map((d) => d.cantidad_ventas);
      const chartCanvas = document.querySelector('canvas');
      new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Cantidad de ventas por mes',
            data: values,
            backgroundColor: 'blue'
          }]
        }
      });
    });
  }*/
// -------------------------- FIN GRAFICO ---------------------------------
  productos: Producto[] = [
   /* producto 1*/
    { id:1, talla: 'S', color: 'Blanco', precio: 14 },
    { id:1, talla: 'M', color: 'Negro', precio: 15 },
    { id:1, talla: 'L', color: 'Rojo', precio: 13 },
    { id:1, talla: 'XL', color: 'Azul', precio: 40 },

   /* Producto 2*/
    { id:2, talla: 'S', color: 'Blanco', precio: 24 },
    { id:2, talla: 'M', color: 'Negro', precio: 10 },
    { id:2, talla: 'L', color: 'Rojo', precio: 15 },
    { id:2, talla: 'XL', color: 'Azul', precio: 12 },


  ];


  productosSeleccionados: Producto[] = [];
  precioTotal = 0;


  agregarProducto(talla: string, color: string) {
    const producto = this.productos.find(p => p.talla === talla && p.color === color);
    if (producto) {
      this.productosSeleccionados.push(producto);
      this.actualizarPrecioTotal();
    }
  }

  eliminarProducto(index: number) {
    this.productosSeleccionados.splice(index, 1);
    this.actualizarPrecioTotal();
  }

  actualizarPrecioTotal() {
    this.precioTotal = this.productosSeleccionados.reduce((total, p) => total + p.precio, 0);
  }


  guardarFactura() {
    // Crea un objeto factura con los datos de los productos seleccionados y el precio total
    const factura = {
      productos: this.productosSeleccionados,
      precioTotal: this.precioTotal
    };

    // Realiza la petición HTTP para guardar la factura en la base de datos
    this.http.post('http://localhost:3000/factura', factura).subscribe(
      response => {
        console.log('Factura guardada con éxito:', response);
        // Aquí podrías resetear los productos seleccionados y el precio total para vaciar el carrito
      },
      error => {
        console.error('Error al guardar factura:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }



}
