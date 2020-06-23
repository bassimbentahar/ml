import React, {useEffect, useState} from 'react';
import {Radar} from 'react-chartjs-2';
import {makeStyles,useTheme} from "@material-ui/styles";
import { colors } from '@material-ui/core';
import Loader from "react-loader-spinner";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width:'65%',
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));

const RadarUserSituation=({positionsData})=>{
    const classes = useStyles();
    positionsData={...positionsData}
    let radarChart=null;

    if(positionsData) {

            const suivi = Object.values({...positionsData.pourcentagesStrategy}) ;
            const StudentName = positionsData.userName;

            if (suivi.length !== 0) {
                let data = {
                    data: suivi,
                    //       la même chose     que            data:dailyData.map((e)=>e.confirmed),
                    borderColor: colors.blue[600],
                    pointBorderColor: '#fff',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    backgroundColor: "rgba(151,187,205,0.2)",
                    pointBackgroundColor: "rgba(151,187,205,1)",
                    hoverPointBackgroundColor: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)"
                }
            }

        radarChart = (
            positionsData.length!== 0
                ? (<Radar
                    width={300}
                    height={300}
                    data={
                        {
                            labels: ['x', 'M', 'O', 'MO', 'OT', 'MOT'],
                            datasets: [
                                {
                                    data: suivi,
                                    label: '',
                                    borderColor: colors.blue[600],
                                    fill:false,
                                    pointBorderColor: '#fff',
                                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                                    backgroundColor: "rgba(151,187,205,0.2)",
                                    pointBackgroundColor: "rgba(151,187,205,1)",
                                    hoverPointBackgroundColor: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)"
                                }
                            ],

                        }
                    }
                    options = {{

                        legend: {
                            display:false
                        },
                        title: {
                            display: true,
                            text: 'Radar des pourcentages par stratégies',
                        },
                        scale: {
                            reverse: false,

                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 100
                            }
                        }
                    }}
                />):null
        )}else{
        radarChart =(
            <Loader
                type="Bars"
                className={classes.loading}
                color="#00BFFF"
                height={100}
                width={100}
            />
        )
    }
    return(
        <div className={classes.root}>
            {radarChart}
        </div>
    )
}



export default RadarUserSituation;


