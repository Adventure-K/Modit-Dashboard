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
    const patientDetails = useSelector((store) => store.patientData.patientData)
    const processedData = useSelector((store) => store.patientData.recentProcessedData)
    // console.log(processedData);
    // console.log(patientDetails);
    let num1 = (processedData.proportionOfGazeTimeOnDrugs) * 100 
    let num2 = (processedData.proportionOfGazeTimeOnNonDrugs) * 100 
    let num3 = (processedData.proportionOfGazeTimeOnBack) * 100 



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
                        backgroundColor: ['rgba(255, 116, 115, 0.2)',
                            'rgba(111, 239, 139, 0.2)',
                            'rgba(141, 141, 141, 0.2)',
                            // 'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)'
                    ],

                        borderColor: ['rgba(255, 116, 115, 1)',
                            'rgba(111, 239, 139, 1)',
                            'rgba(141, 141, 141, 1)',
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
                        text: "Most Recent Entry"
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

        </>

    )
}

export default PieChart