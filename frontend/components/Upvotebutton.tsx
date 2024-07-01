'use client'
import { addPoints } from "../app/actions"
const Upvotebutton = ({ player }: { player: any }) => {

  return (
    <button className="m-6 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:bg-indigo-800 hover:scale-105" onClick={()=>{
      console.log("Hello world");
      addPoints({points:5, playerId:player.id});
    }}>
        ⬆ {' ' + player.name}
    </button>
  )
}

export default Upvotebutton
