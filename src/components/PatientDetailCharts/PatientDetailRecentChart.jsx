//This page is where the pie chart with user expense data is showed. 
//Data is sourced in and the chart dynamically changes depending on data.
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController,
    SubTitle

} from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PieController,
    Title,
    Tooltip,
    Legend,
    SubTitle
)
const PieChart = () => {


    const processedData = useSelector((store) => store.patientData.recentProcessedData)// this is the patients most recent session data
    let num1 = (processedData.proportionOfGazeTimeOnDrugs) * 100
    let num2 = (processedData.proportionOfGazeTimeOnNonDrugs) * 100
    let num3 = (processedData.proportionOfGazeTimeOnBack) * 100
    // Multiplied by 100 to get a percentage number from 1-100 instead of a decimal
    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {

        setChartData({
            labels: ['gaze on trigger: ' + Math.round(num1) + '%', 'gaze on control: ' + Math.round(num2) + '%', 'gaze on back: ' + Math.round(num3) + '%'],
            datasets: [
                {
                    label: "Test data",
                    data: [num1, num2, num3],
                    backgroundColor: ['rgba(255, 116, 115, 0.2)',
                        'rgba(111, 239, 139, 0.2)',
                        'rgba(141, 141, 141, 0.2)',
                    ],

                    borderColor: ['rgba(255, 116, 115, 1)',
                        'rgba(111, 239, 139, 1)',
                        'rgba(141, 141, 141, 1)',
                    ],
                    borderWidth: 1,
                    outerHeight: 200,
                    outerWidth: 200

                }
            ]
        })
        setChartOptions({
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: "Most Recent Entry"
                },
                tooltip: { enabled: false },
                hover: { mode: null },
                subtitle: {
                    display: true,
                    text: 'CATEGORY'
                }
            }
        })

    }, [])




    return (
        <><></>
            <div>
                <Pie options={chartOptions} data={chartData} />
            </div>
        </>
    )
}

export default PieChart