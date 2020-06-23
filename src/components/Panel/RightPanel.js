import React from  'react'
import { Paper} from "@material-ui/core";
import ChartUserSituation from '../Charts/ChartUserSituation/ChartUserSituation'
import ChartUsersSituation from "../Charts/ChartUsersSituation";
import RadarUsersSituation from "../Charts/RadarUsersSituations/RadarUsersSituation";
import RadarUserSituation from "../Charts/RadarUserSituations/RadarUserSituation";
import RadarUsersModulesCompleted from "../Charts/RadarUsersModulesCompleted/RadarUsersModulesCompleted";
import RadarUserModulesCompleted from "../Charts/RadarUserModulesCompleted/RadarUserModulesCompleted";
import ChartUsersModulesCompleted from "../Charts/ChartUsersModulesCompleted/ChartUsersModulesCompleted";
import ChartUserModulesCompleted from "../Charts/ChartUserModulesCompleted/ChartUserModulesCompleted";


const rightPanel=(props)=>{

    let chart;

    if(props.selectedChart==='graphe' ) {
        if(props.topic==='strategies'){
        chart = props.allUser === true ? <ChartUsersSituation positionsData={props.graphAllUsers}/> :
            <ChartUserSituation positionsData={props.graphOneUser}/>
        }else if( props.topic==='retards'){
            console.log(props.graphOneUser)
           chart = props.allUser === true ? <ChartUsersModulesCompleted completionsData={props.graphAllUsers}/> :
                <ChartUserModulesCompleted completionData={props.graphOneUser}/>
        }
    }else if(props.selectedChart==='radar'){
        if(props.topic==='strategies'){
            chart = props.allUser === true ? <RadarUsersSituation positionsData={props.radarAllUsers}/> :
            <RadarUserSituation positionsData={props.radarOneUser}/>
        }else if( props.topic==='retards'){
            chart = props.allUser === true ? <RadarUsersModulesCompleted positionsData={props.radarAllUsers}/> :
                <RadarUserModulesCompleted positionsData={props.radarOneUser}/>
        }

    }

    return(
        <Paper style={props.styles.Paper}>
            {chart}
        </Paper>
    )
}

export default rightPanel;
