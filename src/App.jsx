import {useEffect,useState,useRef} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const[data,setData] = useState([]);
  const country = useRef('');
  const generateData = async () =>{
    try {
      const res = await axios.get('https://restcountries.com/v3.1/all');
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    country.current = (e.target.value).toLowerCase();
    console.log(country.current)
    if(country.current == ''){
      generateData();
    }
    else{
      let len = country.current.length;
      const res = data.filter((item)=>(item.name.official.toLowerCase().slice(0,len+1).includes(country.current)));
      setData(res);
    }
 
  }

  useEffect(()=>{
    generateData();
  },[]);
  

  return (
    <div className="App">
      <input type='text' placeholder='Search for countries' onChange={handleChange}/>
      <div className='container'>
        {data.map((item)=>{
              return (
                <div className='countryCard' key={item.name.official}>
                  <img src = {item.flags.png} alt='Flag' height={100} width={100}/>
                  <p>{item.name.official}</p>
                </div>
                );
            })} 
      </div>
   
    </div>
  );
}

export default App;