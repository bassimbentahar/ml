import React, {Component} from 'react'
import {Grid} from "@material-ui/core";
import RightPanel from '../../components/Panel/RightPanel';
import StudentsToolbar from "../../components/Students/StudentsToolbar";
import {getUsers,getSituationsUser} from "../../api";

class Students extends Component{

    state={
        labelstabs:['Graphe stratégies', 'radar','autre'],
        positionsData:'',
        positionsAllSuivisData:'',
        users:[],
        allUser:true,
        selectedChart:'Graphe stratégies'
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
                positionsAllSuivisData:await getSituationsUser("all")
            })
        }
        fetchAllSuivisAPI();

    }


    changeStudent=(id)=>{
        if (id!=="all") {
            this.setState({allUser:false})
            const fetchAPI=async ()=>{
                this.setState({
                    positionsData:await getSituationsUser(id)
                })
            }
            fetchAPI();

        } else{
            this.setState({allUser:true})
        }
    }

    changeChart=(i)=>{
        console.log("changer chart"+i)
        this.setState({selectedChart:this.state.labelsTabs[i]})

    }
    render() {
    console.log("####mmmmmmmmmmmmmmmm")
        console.log()
        const styles={
            Paper:{padding:100, marginTop:10, marginBottom:10, marginLeft:10}
        }

        return(
            <React.Fragment>
                <StudentsToolbar labelstabs={this.state.labelstabs} changestudent={this.changeStudent} changechart ={this.changeChart} users={this.state.users} />
                <Grid container >
                    <Grid item md>
                        <RightPanel allUser= {this.state.allUser}  selectedChart={this.state.selectedChart}
                                    positionsData={this.state.positionsData } positionsAllSuivisData={this.state.positionsAllSuivisData }
                                    styles={styles}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )

    }
}
export default Students;


