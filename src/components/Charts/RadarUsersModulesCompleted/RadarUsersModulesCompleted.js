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
    }
}));

const RadarUsersModulesCompleted=({positionsData})=>{
    const classes = useStyles();
    positionsData=[...positionsData]


    let radarChart=null;

    if(positionsData.length!=0) {
        let colorsTest = [];
        let colorsLine = []
        let datasets = [];


        for (let i = 0; i < positionsData.length; i++) {
            const StudentName = positionsData[i].userName;
            colorsLine.push(getRandomColor())


                let data = {
                    data: [positionsData[i].completed,positionsData[i].notAttempted,positionsData[i].incompleted],
                    //       la même chose     que            data:dailyData.map((e)=>e.confirmed),
                    label: StudentName,
                    borderColor: colorsLine[i],
                    pointBorderColor: '#fff',
                    fill:false,
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    backgroundColor: "rgba(151,187,205,0.2)",
                    pointBackgroundColor: "rgba(151,187,205,1)",
                    hoverPointBackgroundColor: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)"
                }
                colorsTest = []
                datasets.push(data);

        }
     radarChart = (
        positionsData.length!== 0
            ? (<Radar
                width={100}
                height={100}

    data={
                    {
                        labels: [ 'Completed','Not Attempted', 'Incompleted'],
                        datasets: datasets,

                    }
                }
                options = {{
                    width: 290,
                    height: 290,
                    legend: {
                        display: true,
                        position: 'left',
                        labels: {
                            boxWidth: 50,
                            fontSize: 10,
                            fontColor: '#bbb',
                            padding: 5,
                        }
                    },
                    title: {
                        display: true,
                        text: 'Complétude des modules',
                    },
                    scale: {

                        reverse: false,

                        ticks: {
                            beginAtZero: true
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
        <div  className={classes.root}>
            {radarChart}
        </div>
    )
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default RadarUsersModulesCompleted;


