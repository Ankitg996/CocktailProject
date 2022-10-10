import React,{useEffect, useState} from 'react'
import axios from "axios";
import './App.css';
import Menu from "./Components/Menu/Menu.js";


const App = () => {

  const [cocktails, setCocktails] = useState([]);
  const [name,setName] = useState('');

  const api = async ()=>{
    const data =await axios.get(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    setCocktails(data.data.drinks)
  }

  useEffect( ()=>{
    api();
  } , [name])

  const changeHandler = (value) => {
    setName(value)
  }

  return (
    <div className="main_container">
      <div className='Header_container'>
        <h1> Cocktails </h1>
        <input type='text' placeholder ='drink' value ={name} onChange ={(e) => changeHandler(e.target.value)}></input>
      </div>
      <div className='container'>
        <Menu cocktails={cocktails} setCocktails={setCocktails} />
        <div className='cocktails_container'>
          {cocktails && (
            cocktails.map(drink =>{
                return <div className='cocktail'>
                          <img src={drink.strDrinkThumb} alt =''/> 
                          <h5>{drink.strDrink}</h5>              
                     </div>
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
