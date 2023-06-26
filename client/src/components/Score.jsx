import React from "react";
import { Avatar } from "./Avatar";


export function Score(player, onChange) {

  const award = player.get("award");
  const score = player.get("currentScore");

  // TO DO !!!!!
  // onChange should show how scores would be changing if that were to be the selected rate

  return (
    <div key={player.id}>
      <div className="flex items-center justify-center pd-3 space-x-0.5">

        <div className="flex flex-col items-center space-y-0.5">
          <div className="h-10 w-10 shrink-0">
            <Avatar player={player} />
          </div>

          <svg width="60" height="240">
            <rect x="13" y={230 - score} width="34" height={score} fill="SlateGray" />
            <rect x="13" y={230 - award} width="34" height={award} fill="none" stroke="black" strokeWidth="1" />
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