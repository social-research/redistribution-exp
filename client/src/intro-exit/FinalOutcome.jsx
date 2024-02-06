import { usePlayer, useGame, usePlayers } from "@empirica/core/player/classic/react";
import React from "react";
import { Button } from "../components/Button";
import { Score } from "../components/Score";

const convert100 = "$2.00"

export function FinalOutcome({ next }) {
  
  const game = useGame();
  const player = usePlayer();
  const players = usePlayers();

  function handleSubmit() {
    player.stage.set("submit", true);
  }


  // Use the same setup as in Vote to render final result - TO DO!!!!

  return (
    <div className="mt-10 p-5 flex flex-col items-center space-y-10">
        <div className="text-gray-500 text-2xl pb-4">
          The final tax rate the group selected is: <strong>{game.get("currentMedianVote")}%</strong>
        </div>

        <div>Here are the final scores after tax:</div>

        <div className="flex flex-row">

          <div className="mr-20">
            <div className="text-gray-500 text-2xl pb-4 text-center">You</div>
            <div>
              {Score(player, () => {})}
            </div>
          </div>

          <div>
            <div className="text-gray-500 text-2xl pb-4 text-center">Eight other participants</div>
            <div className="flex flex-row">{players
              .filter((p) => player.get("alterIds").includes(p.id))
              .map((p) => Score(p, () => {}))}
            </div>
          </div>

        </div>
        <br />

        <p className="pt-1">
          Your score will be converted at the exchange rate of 100 points = {convert100} and paid to you as a bonus.
        </p>
        <p className="pt-1">
          <strong>Before receiving your code to claim payment, please fill out a short survey.</strong> 
        </p>
        <br />
        <br />
        <Button handleClick={handleSubmit} autoFocus>
          <p>Next</p>
        </Button>
    </div>
  );
}

//<div className="mt-3 sm:mt-5 p-20">