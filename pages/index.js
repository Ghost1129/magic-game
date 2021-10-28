import { useEffect, useState } from "react"
import Tile from "../components/Tile"

export default function Home() {
const [tiles,setTiles] = useState([])
const [turns,setTurns] = useState(0)
const [firstChoice,setFirstChoice] = useState(null)
const [secondChoice,setSecondChoice] = useState(null)
const [disabled,setDisabled] = useState(false)

//? To Handle Choices
const handleChoice = (tile)=>{
  firstChoice? setSecondChoice(tile):setFirstChoice(tile)
}
//^Compare 2 tiles 
useEffect(()=>{
  if(firstChoice && secondChoice){
    setDisabled(true)
    if(firstChoice.src === secondChoice.src){
      setTiles(prevTiles=>{
        return prevTiles.map(tile=>{
          if(tile.src === firstChoice.src){
            return {...tile,matched:true}
          } else {
            return tile
          }
        })
      })
      resetChoice()
    }
    else{
      setTimeout(()=>resetChoice(),1000)
    }
  }
},[firstChoice, secondChoice])


//^reset choices n increase turn
const resetChoice = () =>{
  setFirstChoice(null)
  setSecondChoice(null)
  setTurns(PrevTurns=> PrevTurns+1)
  setDisabled(false)
}

//^Start Game On Load
useEffect(() => {
  shuffle()
}, [])

  const cards = [
    {"src":"/img/helmet-1.png",matched:false},
    {"src":"/img/potion-1.png",matched:false},
    {"src":"/img/ring-1.png",matched:false},
    {"src":"/img/scroll-1.png",matched:false},
    {"src":"/img/shield-1.png",matched:false},
    {"src":"/img/sword-1.png",matched:false}]

  const shuffle = ()=>{
    const suffledtiles = [...cards, ...cards].sort(()=>Math.random()-0.5)
    .map((tile)=>({...tile,id:Math.random()}))

    setFirstChoice(null)
    setSecondChoice(null)
    setTiles(suffledtiles)
    setTurns(0)
    console.log(tiles,turns)
  }
  return (
    <div className="flex flex-col text-center mx-auto bg-pink-900 h-screen">
      <h1 className="text-xl text-white">Magic Match</h1>
      <button className="mx-auto bg-red-500 text-white mt-2 p-2 w-text h-text cursor-pointer border-2 rounded border-yellow-100 hover:border-blue-700" onClick={shuffle}>New Game</button>
      <div className="max-w-lg mx-auto grid gap-5 grid-cols-4 mt-10">
        {tiles.map(tile=>(
          <Tile key={tile.id} tile={tile} handleChoice={handleChoice} flipped={tile === firstChoice|| tile === secondChoice|| tile.matched} disabled={disabled}/>
        ))}
      </div>
      <p className="mt-4 text-white">Turns:{turns}</p>
    </div>
  )
}
