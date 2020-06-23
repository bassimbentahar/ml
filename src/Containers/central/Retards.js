import React, {Component} from 'react'
import {Grid} from "@material-ui/core";
import RightPanel from '../../components/Panel/RightPanel';
import StudentsToolbar from "../../components/Students/StudentsToolbar";
import {getUsers, getCompletionModules, getCompletionPourcentagesModules} from "../../api";

class Retards extends Component{

    state={
        topic:'retards',
        labelsTabs:['graphe', 'radar','autre'],
        moduleUserPourcentagesCompleted:'',
        moduleUsersPourcentagesCompleted:'',
        moduleUserCompleted:'',
        moduleUsersCompleted:'',
        users:[],
        allUser:true,
        selectedUserId:'',
        selectedChart:'graphe'
    }

    componentDidMount() {
        const fetchAPIUsers=async ()=>{
            this.setState({
                users:await getUsers()
            })
        }
        fetchAPIUsers();

        const fetchAllCompletions=async ()=>{
            this.setState({
                moduleUsersCompleted:await getCompletionModules("all")
            })
        }
        fetchAllCompletions();

        console.log("allsuivis "+this.state.positionsAllSuivisData)


        const fetchAllComppletionPourcentageAPI=async ()=>{
            this.setState({
                moduleUsersPourcentagesCompleted:await getCompletionPourcentagesModules("all")
            })
        }
        fetchAllComppletionPourcentageAPI();

    }


    changeStudent=(id=this.state.selectedUserId)=>{
        if(id!=="all") {
            this.setState({allUser:false})
            const fetchAPISuivis = async () => {
                this.setState({
                    moduleUserCompleted: await getCompletionModules(id)
                })
            }
            fetchAPISuivis();

            const fetchAPIPourcentage = async () => {
                this.setState({
                    moduleUserPourcentagesCompleted: await getCompletionPourcentagesModules(id)
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
                                    graphOneUser={this.state.moduleUserCompleted}
                                    graphAllUsers={this.state.moduleUsersCompleted }
                                    radarOneUser={this.state.moduleUserPourcentagesCompleted }
                                    radarAllUsers={this.state.moduleUsersPourcentagesCompleted}
                                    styles={styles}
                        />

                    </Grid>

                </Grid>


            </React.Fragment>
        )

    }
}
export default Retards;


