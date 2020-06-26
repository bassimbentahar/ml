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

const ChartUsersModulesCompleted=({completionsData})=>{
    const classes = useStyles();

    const theme = useTheme();
    const[userSituations, setUserSituations]=useState([]);
    const[userId, setUserId]=useState({});
    //setUserId({userId:props.userId})

    completionsData=[...completionsData]



    let lineChart=null;

    if(completionsData.length!=0) {
        let colorsLine = [];
        let datasets = [];

        let coursesList = [];
        // get the list of courses for the x axis
        let suiviElement = completionsData.find(e => e.delaysBefore.length !== 0);
        //console.log(suiviElement.delaysBefore)
        //if (suiviElement) coursesList = suiviElement.delaysBefore.map((e, i) => i + 1);
        Object.keys(suiviElement.delaysBefore)
            .forEach(function eachKey(key) {
                coursesList.push(key.substr(0,10))
            });


        for (let i = 0; i < completionsData.length; i++) {

            const suivi = Object.values({...completionsData[i].delaysBefore});
            const StudentName = completionsData[i].userName;

            if (suivi.length !== 0) {
                for (let j = 0; j < suivi.length; j++) {
                    colorsLine.push(getRandomColor())
                }
                let data = {
                    data:suivi,
                    //       la même chose     que            data:dailyData.map((e)=>e.confirmed),
                    label: StudentName,
                    fill: false,
                    borderColor: colorsLine[i],
                    backgroundColor: colors.amber,
                    pointBorderWidth: 1,
                    pointRadius:1,


                }
                datasets.push(data);
            }
        }

        lineChart = (
            completionsData.length !== 0
                ? (<Line
                        data={
                            {
                                labels: coursesList,
                                datasets: datasets
                            }
                        }
                        options={{
                            showScale: true,
                            pointDot: true,

                            title: {
                                display: true,
                                text: 'Modules en retard '
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

export default ChartUsersModulesCompleted;


