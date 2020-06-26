import React, {useEffect, useState} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import {makeStyles,useTheme} from "@material-ui/styles";
import { colors } from '@material-ui/core';
import Loader from 'react-loader-spinner'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    },

    loading: {
        justifyContent: 'center',
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        color:'red',
        height:'300',
        width:'100',
    }

}));

const ChartUsersSituation=({positionsData})=>{
    const classes = useStyles();

    const theme = useTheme();
    const[userSituations, setUserSituations]=useState([]);
    const[userId, setUserId]=useState({});
    //setUserId({userId:props.userId})

    positionsData=[...positionsData]



    let lineChart=null;

    if(positionsData.length!=0) {
        let colorsTest = [];
        let colorsLine = []
        let datasets = [];

        let coursesList = [];


        console.log(positionsData)
        let maxInd=0;
        for (let i = 0; i < positionsData.length; i++) {

            const suivi = [...positionsData[i].strategiesList];
            const StudentName = positionsData[i].userName;
            if (suivi.length !== 0) {
                if(maxInd<suivi.length) maxInd=i;
//                console.log(suivi.map(({strategy}) => strategy))

                for (let j = 0; j < suivi.length; j++) {
                    if (suivi[j].testStatus === "SUCCESS_OK") {
                        colorsTest.push(colors.green[600])

                    } else if (suivi[j].testStatus === "SUCCESS_KO") {
                        colorsTest.push(colors.red[600])
                    } else {
                        colorsTest.push(colors.grey[600])
                    }
                    colorsLine.push(getRandomColor())

                }
                let data = {
                    data: suivi.map(({strategy}) => strategy),
                    //       la même chose     que            data:dailyData.map((e)=>e.confirmed),
                    label: StudentName,
                    fill: false,
                    borderColor: colorsLine[i],
                    backgroundColor: colors.amber,
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
                    pointHighlightStroke: "rgba(151,187,205,1)",
                }
                colorsTest = []
                datasets.push(data);
            }
            coursesList.push(i+1);
            coursesList = suivi.map((e, i) => i + 1);

        }
        // get the list of courses for the x axis
        let elementWithMaxCourses = positionsData[maxInd];
        //console.log(suiviElement)
        if (elementWithMaxCourses) coursesList = elementWithMaxCourses.strategiesList.map((e, i) => i + 1);
        lineChart = (
            positionsData.length !== 0
                ? (<Line
                        data={
                            {
                                labels: coursesList ,
                                datasets: datasets
                            }
                        }
                        options={{
                            maintainAspectRatio: true,

                            showScale: true,
                            pointDot: true,
                            showLines: true,

                            title: {
                                display: true,
                                text: 'Stratégie  '
                            },

                            legend: {
                                display: true,
                                position: 'top',
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
                                            return getLabelModul(label)
                                        },
                                        beginAtZero: true,
                                        min: 0,
                                        max: 6
                                    }

                                }]
                            }

                        }}
                    />
                )
                : null
        )
    }else{
        lineChart =(
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
            {lineChart}


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

export default ChartUsersSituation;


