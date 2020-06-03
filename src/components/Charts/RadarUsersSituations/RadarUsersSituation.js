import React, {useEffect, useState} from 'react';
import {Radar} from 'react-chartjs-2';
import {makeStyles,useTheme} from "@material-ui/styles";
import { colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width:'75%',
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));

const RadarUserSituation=({positionsData})=>{

    positionsData=[...positionsData]

    const classes = useStyles();
    const theme = useTheme();


    let colorsTest=[];
    let colorsLine=[]



    let datasets=[];

    let coursesList=[];
    let suiviElement=positionsData.find(e=>e.length!==0);
    console.log(positionsData)
    if(suiviElement) coursesList=suiviElement.map((e, i)=>i+1);

    for(let i=0; i<positionsData.length  ; i++){
        let suivi=[...positionsData[i]]

        if(suivi.length!==0) {
            for (let j = 0; j < suivi.length; j++) {
                if(suivi[j].testStatus==="SUCCESS_OK"){
                    colorsTest.push(colors.green[600])

                }else if(suivi[j].testStatus==="SUCCESS_KO"){
                    colorsTest.push(colors.red[600])
                }else{
                    colorsTest.push(colors.grey[600])
                }
                colorsLine.push(getRandomColor())
            }
            let data = {
                data: suivi.map(({strategy}) => strategy),
                //       la même chose     que            data:dailyData.map((e)=>e.confirmed),
                label: suivi[0].userName ,
                fill: false,
                borderColor:colorsLine[i],
                backgroundColor: colors.amber,
                pointBackgroundColor:colorsTest,
                pointBorderWidth: 1,
                pointHoverRadius: 6,
                pointHoverBackgroundColor:colorsTest,
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointHitRadius: 10,
                showLine: true,  //!\\ Add this line
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)"
            }
            colorsTest=[]
            datasets.push(data);
        }
    }

    const radarChart = (
        positionsData.length!== 0
            ? (<Radar
                data={
                    {  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
                        datasets: [
                            {
                                label: 'My First dataset',
                                backgroundColor: 'rgba(179,181,198,0.2)',
                                borderColor: 'rgba(179,181,198,1)',
                                pointBackgroundColor: 'rgba(179,181,198,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(179,181,198,1)',
                                data: [65, 59, 90, 81, 56, 55, 40]
                            },
                            {
                                label: 'My Second dataset',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                pointBackgroundColor: 'rgba(255,99,132,1)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(255,99,132,1)',
                                data: [28, 48, 40, 19, 96, 27, 100]
                            }
                        ]}
                }
            />):null
    )
    return(
        <div className={classes.root}>
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
function getLabelModul(label) {
    if (label === 1 ) {
        return "x";
    } else if (label ===2 ) {
        return "M";
    } else if (label===3) {
        return "O"
    } else if(label===4){
        return "MO";
    }else if(label===5){
        return "OT";
    }else if(label===6){
        return "MOT"
    }
}
export default RadarUserSituation;


