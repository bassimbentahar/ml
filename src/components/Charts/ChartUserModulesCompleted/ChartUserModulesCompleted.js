import React, {useEffect, useState} from 'react';
import {getSituationsUser} from "../../../api";
import {Line, Bar} from 'react-chartjs-2';
import {makeStyles,useTheme} from "@material-ui/styles";
import { colors } from '@material-ui/core';
import Loader from "react-loader-spinner";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width:'75%',
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));

const ChartUserModulesCompleted=({completionData})=>{
    const classes = useStyles();
    const theme = useTheme();



    completionData={...completionData}

    let lineChart=null;
    if(Object.keys(completionData).length !== 0) {

        const colorsTest = [];
        console.log(completionData)


        lineChart = (
            completionData.length !== 0
                ? (<Line
                    data={
                        {
                            labels: Object.keys(completionData.delaysBefore),
                            datasets: [{
                                data: Object.values(completionData.delaysBefore),
                                //       la même chose que data:dailyData.map((e)=>e.confirmed),
                                label: completionData.userName,
                                fill: false,
                                backgroundColor: colors.blue[600],
                                borderColor: colors.blue[600],
                                pointBackgroundColor: colorsTest,
                                pointBorderWidth: 1,
                                pointHoverRadius: 10,
                                pointHoverBackgroundColor: colorsTest,
                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                pointHoverBorderWidth: 2,
                                pointRadius:4,
                                pointHitRadius: 15,
                                showLine: true,
                                pointStrokeColor: "#fff",
                                pointHighlightFill: "#fff",
                            }
                            ],

                        }}

                    options={{
                        showScale: true,
                        pointDot: true,
                        showLines: true,

                        title: {
                            display: true,
                            text: 'Stratégie  '
                        },

                        legend: {
                            display: true,
                            labels: {
                                boxWidth: 50,
                                fontSize: 10,
                                fontColor: '#bbb',
                                padding: 5,
                            }
                        },

                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Stratégies'
                                },
                                ticks: {

                                    beginAtZero: true,
                                    min: 0
                                }

                            }]
                        }

                    }}
                />) : null
        )
    }else{
        lineChart =(
            <Loader
                type="Bars"
                className={classes.loading}
                color="#00BFFF"
                height={100}
                width={100}
            />        )
    }
    return(
        <div className={classes.root}>
            {lineChart}
        </div>
    )
}
export default ChartUserModulesCompleted;


