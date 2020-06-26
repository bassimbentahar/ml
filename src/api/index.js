import axios from 'axios';

const url='http://localhost:8080/';


export const getSituations=async (id,selectedDate)=>{
    console.log(selectedDate)
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/suivi?maxDate=${selectedDate}`): await axios.get(`${url}/users/${id}/suivi?maxDate=${selectedDate}`);
        return data;
    }catch (error) {
        console.log(error)
    }
}

export const getPourcentages=async (id,selectedDate)=>{
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/suiviPourcentage?maxDate=${selectedDate}`): await axios.get(`${url}/users/${id}/suiviPourcentage?maxDate=${selectedDate}`);
        return data;
    }catch (error) {
        console.log(error)
    }
}

export const getCompletionPourcentagesModules=async (id,selectedDate)=>{
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/completionPourcentagesModules?maxDate=${selectedDate}`): await axios.get(`${url}/users/${id}/completionPourcentagesModules?maxDate=${selectedDate}`);
        return data;
    }catch (error) {
        console.log(error)
    }
}

export const getCompletionModules=async (id,selectedDate)=>{
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/completionModules?maxDate=${selectedDate}`): await axios.get(`${url}/users/${id}/completionModules?maxDate=${selectedDate}`);
        return data;
    }catch (error) {
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
