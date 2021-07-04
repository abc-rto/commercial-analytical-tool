import React from 'react'
import { Bar } from '@reactchartjs/react-chart.js'
import { PromiseProvider } from 'mongoose'

export default function BarChart(props) {

    const data = {
        labels: props.labels,
        datasets: props.datasets,
      }
      
      const options = {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }
      
      return (
        <div>
          <Bar data={data} options={options} />
        </div>
      )
}



