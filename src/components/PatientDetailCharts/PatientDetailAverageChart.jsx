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

    const dispatch = useDispatch()
    // const patientDetails = useSelector((store) => store.patientData.patientData)
    const averageProcessedData = useSelector((store) => store.patientData.averagePatientProcessedData)
    console.log(averageProcessedData);
    let num1 = (averageProcessedData.drugs) * 100
    let num2 = (averageProcessedData.noDrugs) * 100
    let num3 = (averageProcessedData.back) * 100 
    console.log(averageProcessedData.drugs);





    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {

        setChartData({
            labels: ['% time on drugs', '% time on non drugs ', '% time on back'],
            datasets: [
                {
                    label: "Test data",
                    data: [num1, num2, num3],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        // 'rgba(75, 192, 192, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)'
                    ],

                    borderColor: ['rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)'
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
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Data averages"
                },
                subtitle: {
                    display: true,
                    text: 'CATEGORY'
                }
            }
        })

    }, [])

    //^^^ all data for creating the chart


    return (
        <><></>

            <div>
                <Pie options={chartOptions} data={chartData} />
            </div>
            {/* {processedData.map(dataEntry => {
                return (
                    <p>1</p>
                )
            })} */}

        </>

    )
}

export default PieChart