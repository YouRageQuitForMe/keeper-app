import { useState, useEffect } from 'react';
import '../style.css';
import { Link, BrowserRouter as Router } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(data => {setData(data)})
  }, [])
  

    function staFinendo(prod) {
      if (prod.quantità < 1) {
        return {"border-left": "10px solid #b3009e"}
      } else { 
        return {"border-left": "10px solid #665eff"}
      }
    }
    function handleClick(idProdotto) {
      const requestOptions = {
        method: 'DELETE'
      };

      fetch("/delete/" + idProdotto, requestOptions).then((err) => {
        if (err) console.log(err)
        window.location.reload();
      }) 
    }

    function renderItems() {
      return(
      data.map((elem, index) => {
        return (
          <div className="card" style={staFinendo(elem)}>
            <button type="button" onClick={() => handleClick(elem._id)} >X</button>
            <h1>{elem.nome}</h1>
            <h2>{elem.descrizione}</h2>
            <p>Quantità: {elem.quantità}</p>
          </div>
        )
        
      }))
      }
    

  return (
    <>
    <div className="App">
    <div className="btn-flex">
    <Link to="/add" style={{ textDecoration: 'none' }}><div className="add">+</div></Link>
    <Link to="/database" style={{ textDecoration: 'none' }}><div className="add" style={{fontSize: "45px"}}>DB</div></Link>
    </div>
    <hr style={{ color: "white", width: "80%", marginLeft: "auto", marginRight: "auto", marginBottom: "70px", borderRadius: "20px"}}></hr>
{renderItems()}
    </div>
    </>
  );
}

  
export default Home;