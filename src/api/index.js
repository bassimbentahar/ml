import axios from 'axios';

const url='http://localhost:8080/';


export const getSituations=async (id)=>{
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/suivi`): await axios.get(`${url}/users/${id}/suivi`);
        return data;
    }catch (error) {
        console.log(error)
    }
}

export const getPourcentages=async (id)=>{
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/suiviPourcentage`): await axios.get(`${url}/users/${id}/suiviPourcentage`);
        return data;
    }catch (error) {
        console.log(error)
    }
}

export const getCompletionPourcentagesModules=async (id)=>{
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/completionPourcentagesModules`): await axios.get(`${url}/users/${id}/completionPourcentagesModules`);
        return data;
    }catch (error) {
        console.log(error)
    }
}

export const getCompletionModules=async (id)=>{
    try {
        const {data}= id ==="all"? await axios.get(`${url}/users/completionModules`): await axios.get(`${url}/users/${id}/completionModules`);
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
