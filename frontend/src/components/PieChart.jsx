'use client'
import { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
          labels: ["Willing", "Tentative", "Not Willing"],
          datasets: [
            {
              data: [data.willing, data.tentative, data.notWilling],
              borderColor: ["#3cba9f", "#ffa500", "#c45850"],
              backgroundColor: [
                "rgb(60,186,159,0.1)",
                "rgb(255,165,0,0.1)",
                "rgb(196,88,80,0.1)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20, 
                },
              },
            },
          },
        },
      });

      chartRef.current = myChart;
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.options.plugins.legend.labels.font.size = 14;
      chartRef.current.update();
    }
  }, [data]);

  return (
    <div className="flex items-center w-full h-full">
      {/* Pie chart */}
      <canvas ref={chartRef} className="w-full h-full" id="myChart"></canvas>
      {/* <canvas id='myChart'></canvas> */}
    </div>
  );
};

export default PieChart;
