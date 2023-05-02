import Chart from 'chart.js';
const Chart = require('chart.js');
const labels = results.map((row) => row.id_producto);
const data = results.map((row) => row.num_comparaciones);

const canvas = document.getElementById('grafico');
const ctx = canvas.getContext('2d');

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Cantidad de comparaciones',
      data: data,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
