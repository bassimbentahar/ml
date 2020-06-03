import axios from 'axios';

const url='http://localhost:8080/';


export const getSituationsUser=async (id)=>{
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/suivi`): await axios.get(`${url}/users/${id}/suivi`);
        return data;
    }catch (error) {
        console.log(error)
    }
}


export const fetchData=async ()=>{
    try {
        const {data:{confirmed,recovered,deaths,lastUpdate}}=await axios.get(url);
        //facon compacte pour créer un objet et mettre dedans les valeurs qu'on cherche
        // retourn un objet {confirmed:data.confirmer , recovered:......}
        return {confirmed, recovered, deaths, lastUpdate} ;
    }catch (error) {
        console.log(error)
    }
}



export const fetchDailyData=async ()=>{
    try{

        const {data}=await axios.get(`${url}/daily`);
        const modifiedData=data.map(dailyData=>(
                {
                    confirmed:dailyData.confirmed.total,
                    deaths:dailyData.deaths.total,
                    date:dailyData.reportDate
                }
            )
        )
            return modifiedData
    }
    catch (error) {
        console.log(error)
    }
}

export const getUsers=async()=>{
    try{
    const response=await axios.get(`${url}/users`);
        return response.data;
    }catch (error) {
        console.log(error)
    }
}
