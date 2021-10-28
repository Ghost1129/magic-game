

function Tile({tile,handleChoice,flipped,disabled}) {
  const handleclick = () =>{
    if(!disabled){
      handleChoice(tile)
    }
    
  }
    return (
        <div className="card relative">
            <div className={flipped ? "flipped" :""}>
              <img className={"front block w-full border-2 border-white rounded-lg"} src={tile.src} alt="frontimg"/>
              <img 
              className="back block w-full border-2 border-white rounded-lg"
              src="/img/cover.png"
              alt="backimg"
              onClick={handleclick}/>
            </div>
          </div>
    )
}

export default Tile
