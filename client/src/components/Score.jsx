import React from "react";
import { Avatar } from "./Avatar";


export function Score(player, onChange) {

  const award = player.get("award");
  const score = player.get("currentScore");

  // TO DO !!!!!
  // onChange should show how scores would be changing if that were to be the selected rate

  return (
    <div key={player.id}>
      <div className="flex items-center space-x-6">

        <div className="flex flex-col items-center space-y-0.5">
          <div className="h-12 w-12 shrink-0">
            <Avatar player={player} />
          </div>

          <svg width="50" height="240">
            <rect x="5" y={230 - score} width="40" height={score} fill="LightSlateGray" />
            <rect x="5" y={230 - award} width="40" height={award} fill="none" stroke="black" strokeWidth="1" />
          </svg>

          <h1 className="text-xs font-semibold uppercase tracking-wider leading-none text-gray-400">
            Score
          </h1>
          <div className="text-2xl font-semibold leading-none font-mono">
            {score}
          </div>
        </div>
          
      </div>
    </div>
  );
}

//<div className="pb-2 mb-6">
//    </div>

//className="py-4"