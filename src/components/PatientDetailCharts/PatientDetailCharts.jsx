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
    const processedData = useSelector((store) => store.patientData.processedData)
    console.log(processedData);
    console.log(patientDetails);
    let num = Number(processedData.proportionOfGazeTimeOnDrugs)

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        
            setChartData({
                labels: ['% time on drugs', '% time on non drugs,', '% time on back', '% time on drugs no back', '% time on non drugs no back'],
                datasets: [
                    {
                        label: "Test data",
                        data: [num],
                        backgroundColor: ['rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'],

                        borderColor: ['rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'],
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
                        text: "Test"
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
            {num &&
                <div>
                    <Pie options={chartOptions} data={chartData} />
                </div>
            }
        </>

    )
}

export default PieChart