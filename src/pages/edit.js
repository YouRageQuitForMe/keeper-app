import React from 'react';
import { useState } from 'react';

export default function Edit() {

  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [quantità, setQuantità] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    const prodotto = {nome, descrizione, quantità};

    fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(prodotto)
    }).then((err) => {
      if (err) console.log(err)
      console.log("Ciaooooo");
      window.location.href = "/";
    }) 
  }



  return(
     <div>
       <h1>Aggiungi un nuovo prodotto</h1>
       <form onSubmit={handleSubmit}>
       <label>Nome prodotto:</label>
       <input
        type="text"
        required
        value={nome}
        onChange={(e) => {setNome(e.target.value)}}
        />
       <label>Descrizione prodotto:</label>
       <input
        type="text"
        required
        value={descrizione}
        onChange={(e) => {setDescrizione(e.target.value)}}
        />
       <label>Quantità:</label>
       <input
        type="number"
        required
        value={quantità}
        onChange={(e) => {setQuantità(e.target.value)}}
        />
        <button>Aggiungi prodotto</button>



       </form>
     </div>
  ) 
}