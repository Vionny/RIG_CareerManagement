import "../app/globals.css"
import { useEffect } from "react"
import { Chart } from "chart.js";
function PieChart() {
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Willing", "Tentative", "Not Willing"],
                datasets: [{
                    data: [70, 10, 6],
                    borderColor: [
                        "#3cba9f",
                        "#ffa500",
                        "#c45850",
                    ],
                    backgroundColor: [
                        "rgb(60,186,159,0.1)",
                        "rgb(255,165,0,0.1)",
                        "rgb(196,88,80,0.1)",
                    ],
                    borderWidth: 2,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                    }],
                }
            },
        });
    }, [])
    return (
        <>
            {/* Pie chart */}
            <div className="flex items-center w-full h-full ">
                
                    <canvas id='myChart' className="w-full h-full"></canvas>
                
            </div>
        </>
    )
}
export default PieChart