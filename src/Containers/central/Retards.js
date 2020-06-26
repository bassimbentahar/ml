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
        selectedChart:'graphe',
    }

    componentDidMount() {
        this.selecttAll("")
    }

    selecttAll=(selectedDate)=>{

        const fetchAPIUsers=async ()=>{
            this.setState({
                users:await getUsers()
            })
        }
        fetchAPIUsers();

        const fetchAllCompletions=async ()=>{
            this.setState({
                moduleUsersCompleted:await getCompletionModules("all",selectedDate)
            })
        }
        fetchAllCompletions();

        console.log("allsuivis "+this.state.positionsAllSuivisData)


        const fetchAllComppletionPourcentageAPI=async ()=>{
            this.setState({
                moduleUsersPourcentagesCompleted:await getCompletionPourcentagesModules("all",selectedDate)
            })
        }
        fetchAllComppletionPourcentageAPI();
    }

    changeStudent=(id=this.state.selectedUserId, selectedDate='')=>{
        if(id!=="all") {
            this.setState({allUser:false})
            const fetchAPISuivis = async () => {
                console.log(this.state.selectedDate);
                this.setState({
                    moduleUserCompleted: await getCompletionModules(id,selectedDate)
                })
            }
            fetchAPISuivis();

            const fetchAPIPourcentage = async () => {
                this.setState({
                    moduleUserPourcentagesCompleted: await getCompletionPourcentagesModules(id,selectedDate)
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
    setDate=(selectedDate)=>{

        if(!this.state.allUser){
            this.changeStudent(this.state.selectedUserId,selectedDate)
        }else{
            this.selecttAll(selectedDate)
        }
    }

    render() {
        const styles={
            Paper:{padding:100, marginTop:10, marginBottom:10, marginLeft:10}
        }

        return(
            <React.Fragment>
                <StudentsToolbar labelstabs={this.state.labelsTabs}
                                 changestudent={this.changeStudent}
                                 setDate ={this.setDate}
                                 changechart ={this.changeChart}
                                 users={this.state.users} />
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


