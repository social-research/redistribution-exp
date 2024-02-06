import {
  Slider,
  usePlayer,
  usePlayers,
  useRound,
  useGame,
} from "@empirica/core/player/classic/react";
import React from "react";
import { Button } from "../components/Button";
import { Score } from "../components/Score";

export function Vote() {

  const labelClassName = "block text-sm font-medium text-gray-700 mx-2";
  const sliderClassName = "w-full";

  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const game = useGame();

  function handleChange(e) {
    console.log(parseInt(e.target.valueAsNumber));
    player.round.set("vote", e.target.valueAsNumber);
  }

  function handleSubmit() {
    player.stage.set("submit", true);
  }

  const displayResult = round.get("displayResult");

  // Always show the current score of observed sample - as a bar plot
  // After first round, show medianVote and wealth (faded) vs current score 
  
  // Elements not centered !!!

  const result = (
    <div>

      <div className="mx-2">
        {displayResult ? (
          <div className="text-gray-500 text-2xl pb-4">
            The tax rate the group selected is: <strong>{game.get("currentMedianVote")}%</strong>
          </div>
        ) : null}
      </div>
      <br />

      <div className="mx-2">
        {displayResult ? (
          <div>Here are the new scores after tax (grey blocks) compared to the old scores (black outlines):</div>
        ) : <div>Here are the scores you can observe:</div>}
      </div>
      <br />

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
            .map((p) => Score(p, handleChange))}
          </div>
        </div>

      </div>

      <br /><br />

      <div className="mx-2">
        {displayResult ? (
          <div>
            <p>You voted for a tax rate of {player.get("currentVote")}% in the previous round.</p>
            <p><strong>You and the rest of the group have a chance to vote again.</strong></p>
            <p>Modify your vote with the slider or simply submit the same vote:</p>
           </div>
        ) : 
          <div>
            <p><strong>Please vote for the rate at which to tax awards.</strong></p>
            <p>Use the slider below to select your preferred tax rate and then submit your vote:</p>
          </div>}
      </div>

    </div>
  );

   
  //else if (players.length == 1 && displayResult) {
  //  result = (
  //    <div className="grid grid-cols-2 items-center">
  //      {result}
  //      <div>
  //        {displayResult ? PlayerScore(player, () => {}, displayResult) : null}
  //      </div>
  //    </div>
  //  );
  //}

  console.log("Current vote:", player.get("currentVote"));
  //console.log("Others:", player.get("alterIds"));
  console.log("Vote:", player.round.get("vote"));
  console.log(player.get("alterIds"));
  
  // TO DO!!! - fix slider width (label changes to span width but slider width stays the same)
  // Code in /server/node_modules/@empirica/core/dist/chunk-FHOK5C4Q.js

  return (
    <div> 
      <div className="flex flex-col items-center space-y-10">
        {result}
      </div>

      <div className="flex flex-row items-center mt-12">
        <div className={labelClassName}>Your vote:</div>
        <div>
          <Slider
            aria-label="Vote"
            value={player.round.get("vote")}
            onChange={handleChange}
            min={0}
            step={1}
            max={100}
          />
        </div>
        <div className={labelClassName}>%</div>
      </div>

      <div className="mt-8">
        <Button handleClick={handleSubmit} primary>
          Submit
        </Button>
      </div>
    </div>
  );
}



