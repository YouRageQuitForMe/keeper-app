import { useState, useEffect } from 'react';
import styles from '../style.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(data => {setData(data); console.log(data)})
  }, [])
  

    function staFinendo() {
      if (data.quantità < 1) {
        return {"border-left": "2px solid red"}
      } else { 
        return {"border-left": "2px solid green"}
      }
    }
    function handleClick(idProdotto) {
      const requestOptions = {
        method: 'DELETE'
      };

      fetch("/delete/" + idProdotto, requestOptions)
    }

    function renderItems() {
      return(
      data.map((elem, index) => {
        return (
          <div className="card" style={staFinendo()}>
            <button type="button" onClick={handleClick(elem._id)} >X</button>
            <h1>{elem.nome}</h1>
            <h2>{elem.descrizione}</h2>
            <p>Quantità: {elem.quantità}</p>
          </div>
        )
        
      }))
      }
    

  return (
    <div className="App">
{renderItems()}
    </div>
  );
}

  
export default Home;