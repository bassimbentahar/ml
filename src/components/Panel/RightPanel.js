import React from  'react'
import { Paper} from "@material-ui/core";
import ChartUserSituation from '../Charts/ChartUserSituation/ChartUserSituation'
import ChartUsersSituation from "../Charts/ChartUsersSituation";
import RadarUserSituation from "../Charts/RadarUsersSituations/RadarUsersSituation";


const rightPanel=(props)=>{

    let chart;

    if(props.selectedChart==='Graphe stratégies') {
        chart = props.allUser === true ? <ChartUsersSituation positionsData={props.positionsAllSuivisData}/> :
            <ChartUserSituation positionsData={props.positionsData}/>
    }else if(props.selectedChart==='radar'){
        chart = props.allUser === true ? <RadarUserSituation positionsData={props.positionsAllSuivisData}/> :
            <ChartUserSituation positionsData={props.positionsData}/>
    }

    return(
        <Paper style={props.styles.Paper}>
            {chart}
        </Paper>
    )
}

export default rightPanel;
