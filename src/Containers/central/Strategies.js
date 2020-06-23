import React, {Component} from 'react'
import {Grid} from "@material-ui/core";
import RightPanel from '../../components/Panel/RightPanel';
import StudentsToolbar from "../../components/Students/StudentsToolbar";
import {getUsers,getSituations,getPourcentages} from "../../api";

class Strategies extends Component{

    state={
        topic:'strategies',
        labelsTabs:['graphe', 'radar','autre'],
        positionUserPourcentagesData:'',
        positionUserSuivisData:'',
        positionsAllPourcentageSuivisData:'',
        positionsAllSuivisData:'',
        users:[],
        allUser:true,
        selectedUserId:'',
        selectedChart:'graphe',

    }

    componentDidMount() {
        console.log("componentDidMount")
        const fetchAPIUsers=async ()=>{
            this.setState({
                users:await getUsers()
            })
        }
        fetchAPIUsers();

        const fetchAllSuivisAPI=async ()=>{
            this.setState({
                positionsAllSuivisData:await getSituations("all")
            })
        }
        fetchAllSuivisAPI();
        console.log("allsuivis "+this.state.positionsAllSuivisData)


        const fetchAllSuivisPoucentagesAPI=async ()=>{
            this.setState({
                positionsAllPourcentageSuivisData:await getPourcentages("all")
            })
        }
        fetchAllSuivisPoucentagesAPI();
        console.log("allPourcentage "+this.state.positionsAllPourcentageSuivisData)
    }


    changeStudent=(id=this.state.selectedUserId)=>{
        if(id!=="all") {
            this.setState({allUser:false})
            const fetchAPISuivis = async () => {
                this.setState({
                    positionUserSuivisData: await getSituations(id)
                })
            }
            fetchAPISuivis();

            const fetchAPIPourcentage = async () => {
                this.setState({
                    positionsUserPourcentageData: await getPourcentages(id)
                })
            }
            fetchAPIPourcentage();

        } else{
            this.setState({allUser:true})
        }
        this.setState({selectedUserId:id})

    }

    changeChart=(i)=>{
        this.setState({selectedChart:this.state.labelsTabs[i]})
    }

    render() {
        const styles={
            Paper:{padding:100, marginTop:10, marginBottom:10, marginLeft:10}
        }

        return(
            <React.Fragment>
                <StudentsToolbar labelstabs={this.state.labelsTabs} changestudent={this.changeStudent} changechart ={this.changeChart} users={this.state.users} />
                <Grid container >
                    <Grid item md>
                        <RightPanel
                                    topic={this.state.topic}
                                    allUser= {this.state.allUser}
                                    selectedChart={this.state.selectedChart}
                                    graphOneUser={this.state.positionUserSuivisData}
                                    radarOneUser={this.state.positionsUserPourcentageData }
                                    graphAllUsers={this.state.positionsAllSuivisData }
                                    radarAllUsers={this.state.positionsAllPourcentageSuivisData}
                                    styles={styles}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )

    }
}
export default Strategies;


