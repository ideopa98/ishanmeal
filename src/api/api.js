import axios from 'axios';

export const fetchData = async ()=>{

    const res = await axios.get("https://theaxolotlapi.netlify.app/")
    console.log("api res",res)
    return res
}