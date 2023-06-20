import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import React from "react";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";

const convert100 = "$1.00"

export function FinalOutcome({ next }) {
  
  const game = useGame();
  const player = usePlayer();

  // Use the same setup as in Vote to render final result - TO DO!!!!

  return (
    <div className="mt-3 sm:mt-5 p-20">
        <div className="text-gray-500 text-2xl">
          The final tax rate the group selected is: <strong>{game.get("currentMedianVote")}%</strong>. 
        </div>
        <p className="pt-8">
          <strong>Your final score is {player.get("currentScore")} points</strong>. 
        </p>
        <p className="pt-1">
          This score will be converted at the exchange rate of 100 points = {convert100} and paid to you as a bonus.
        </p>
        <br />
        <p className="pt-1">
          Please fill out a short survey before receiving your code to claim payment. 
        </p>
        <br />
        <Button handleClick={next} autoFocus>
          <p>Next</p>
        </Button>
    </div>
  );
}

