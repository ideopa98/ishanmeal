import logo from './logo.svg';
import { useState, useEffect } from "react";
import Graph from './graph'
import './App.css';
import moment from "moment"
import {data} from "./api/apiData"

function App() {
  const [uniqueDates,setUniqueDates] = useState([]);
  const [selectedDate, setSelectedDate]= useState(0);
  const [graphData, setGraphData] = useState([]);
  const [graphData2, setGraphData2] = useState([]);

  useEffect(() => {
    let res = data
    const key = "item_date"
    const arrayUniqueByKey = [...new Map(res.map(item =>[item[key], item.item_date])).values()];
    setUniqueDates(arrayUniqueByKey)
  },[])

  const handleChange = (e)=>{
    // console.log("ate Selected!!", e.target.value);
    setSelectedDate(e.target.value);
  }

  useEffect(()=>{
    let tempData = []
    data.filter((item)=>{
      return item.item_date === selectedDate
    }).map((item)=>{
      let time = moment(item.schedule_time).format('LLL')
      let temp
      if(item.slot === "D"){
        temp = {
          name: time,
          Dinner: 1
        }
      }else{
        temp = {
          name: time,
          Lunch: 1,
        }
      }
      
      tempData.push(temp)
      // graphData(tempData)
    })
    setGraphData(tempData)
  },[selectedDate])


  useEffect(() => {
    let newObj = {}
    data.filter((item) => {
      return item.item_date === selectedDate
    }).map((item)=>{
      if (newObj[item.schedule_time.slice(0, 10)] != undefined){
        console.log('count', newObj[item.schedule_time.slice(0, 10)] )
        newObj[item.schedule_time.slice(0, 10)] = newObj[item.schedule_time.slice(0, 10)]+1
      }else{
        newObj[item.schedule_time.slice(0,10)] = 1
      }

    })
    console.log("new obj", newObj)
    let tempData = []
    Object.keys(newObj).map(item=>{
        let temp = {
          name: moment(item).format('ll'),
          Lunch: newObj[item],
        }
      tempData.push(temp)
    })

    setGraphData2(tempData)
  }, [selectedDate])

  return (
    <div className="App">
    <h1 className='text'>Select delivery date: </h1>
    <div className="dropdown">
      <select onChange={handleChange} value={selectedDate}>
        <option value={0}>{"Select Delivery Date"}</option>
        {uniqueDates.map((option, index) => (
          <option value={option}>{moment(option).format('ll')}</option>
        ))}
      </select>
    </div>
      {graphData && graphData.length > 0 && <Graph className="Graph" showOption={true} showx={false} data={graphData} />}
      {graphData2 && graphData2.length > 0 && <Graph className="Graph" showOption={false} showx={true} data={graphData2} />}
      
    </div>
  );
}

export default App;