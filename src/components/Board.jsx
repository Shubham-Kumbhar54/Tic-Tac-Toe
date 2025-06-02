import { useState } from "react"
import JSConfetti from "js-confetti"


function Board ()
{
    const squareArr = new Array(9).fill(null)
    // this is the logic in javascript [null,null,null,null,null,null,null,null,null] 
    const [squares,setSquares]=useState(squareArr)
    const[isXNext,setXNext]=useState(true)
    const handleSquares = (i) =>
    {
     if(squares[i]== null)
     {
        if(calculateWinner(squares))
        {
            return;
        }
       const newSquares = squares.slice();
       newSquares[i] = isXNext ? 'X' : 'O'
       setSquares(newSquares)
       setXNext(!isXNext)
    }
    if((squares.includes(null)== false) && (calculateWinner(squares)==null))
    {
        status='DRAW'

    }

    
    }
    const Winner = calculateWinner(squares)
    const status= Winner ? `Winner:${Winner}`:`Next player: ${isXNext ? "x":"o"}`
    
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl text-white">{status}</h2>
            <div className="grid grid-cols-3 gap-2">
                {
                  squares.map((value,index) => (
                      <button className="w-24 h-24 bg-blue-500 text-white text-3xl font-bold flex items-center justify-center border-2 border-white transition-all hover:bg-orange-500"
                      onClick={()=>handleSquares(index)}>
                       {value}
                      </button>
                  ))
                  
                }
            </div>
            <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800" onClick={()=> {setSquares(squareArr);setXNext(true)} }>Reset Game</button>
            
        </div>
    )
}
function calculateWinner(squares)
{
   const lines = [
    [0,1,2],[3,4,5],[6,7,8],[2,1,0],[5,4,3],[8,7,6],
    [0,3,6],[6,3,0],[1,4,7],[7,4,1],[2,5,8],[8,5,2],
    [0,4,8],[2,4,6],[8,4,0],[6,4,2]
   ]
   for(let line of lines)
   {
    const [a,b,c] = line;
    if(squares[a] && squares[a]==squares[b] && squares[a]==squares[c])
    {
        const jsConfetti = new JSConfetti()
           
          jsConfetti.addConfetti()
          return squares[a]
    }
        
   }
   return null;
}
export default Board