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
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));

const ChartUserSituation=(props)=>{
    const classes = useStyles();
    const theme = useTheme();



    const positionsData=props.positionsData

    let lineChart=null;
    if(positionsData) {

        const colorsTest = [];
        console.log(positionsData)
        for (let i = 0; i < positionsData.strategiesList.length; i++) {
            if (positionsData.strategiesList[i].testStatus === "SUCCESS_OK") {
                colorsTest.push(colors.green[600])

            } else if (positionsData.strategiesList[i].testStatus === "SUCCESS_KO") {
                colorsTest.push(colors.red[600])
            } else {
                colorsTest.push(colors.grey[600])
            }
        }

         lineChart = (
            positionsData.length !== 0
                ? (<Line
                    data={
                        {
                            labels: positionsData.strategiesList.map((e, i) => i),
                            datasets: [{
                                data: positionsData.strategiesList.map(({strategy}) => strategy),
                                //       la même chose que data:dailyData.map((e)=>e.confirmed),
                                label: positionsData.userName,
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
                                    callback: function (label, index, labels) {
                                        if (label === 1) {
                                            return "x";
                                        } else if (label === 2) {
                                            return "M";
                                        } else if (label === 3) {
                                            return "O"
                                        } else if (label === 4) {
                                            return "MO";
                                        } else if (label === 5) {
                                            return "OT";
                                        } else if (label === 6) {
                                            return "MOT"
                                        }
                                    },
                                    beginAtZero: true,
                                    min: 0,
                                    max: 6
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
export default ChartUserSituation;


