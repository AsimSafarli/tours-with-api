import { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading';
import Tours from './Tours';

function App() {
  const url = 'https://course-api.com/react-tours-project'
    const [loading,setLoading]=useState(true)
    const [tours,setTours]=useState([])
    const romoveTour = (id)=>{
      const newTours = tours.filter((tour)=>tour.id !==id )
      setTours(newTours)
    }
    const fetchTours = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        const tours = await response.json()
        setLoading(false)
        setTours(tours)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    useEffect(()=>{
    fetchTours()
    },[])
    if(loading){
      return(
        <main>
          <Loading/>
        </main>
      )
    }
    if(tours.length===0){
      return(
        <main>
          <div className='title'>
             <h2>No Tours Left</h2>
             <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
          </div>
        </main>
      )
    }
  return (
    <main >
      <Tours tours={tours} romoveTour={romoveTour}/>
    </main>
  );
}

export default App;
