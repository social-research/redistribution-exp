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

  // TO DO!!!!
  // PLAYERS SHOULD BE SHOWN HORIZONTALLY - write code to add as many players as observed
  
  // Elements not centered !!!
  // Need more space after text
  // Test for 2 
  // Test for 8

  const numColumns = "grid grid-cols-" + (player.get("alterIds").length) + " items-center";

  const result = (
    <div>

      <div>
        {displayResult ? (
          <div className="text-gray-500 text-2xl  pb-4">The tax rate the group selected is: {game.get("currentMedianVote")}% tax rate</div>
        ) : null}
      </div>
      <br />

      <div className="flex flex-row">

        <div className="mr-20">
          <div className="text-gray-500 text-2xl">You</div>
          <div>
            {Score(player, () => {})}
          </div>
        </div>

        <div>
          <div className="text-gray-500 text-2xl">The participants you can observe</div>
          <div className={numColumns}>{players
            .filter((p) => player.get("alterIds").includes(p.id))
            .map((p) => Score(p, handleChange))}
          </div>
        </div>

      </div>

    </div>
  );

  let prompt = (
    <div>
      <p><strong>Please vote for the rate at which to tax awards.</strong></p>
      <p>Use the slider below to select your preferred tax rate and then submit your vote:</p>
    </div>
  );

  if (displayResult) {
    prompt = (
      <div>
        <p>In the previous round, you voted for a tax rate of <strong>{player.get("currentVote")}%</strong>.</p>
        <p><strong>You and the rest of the group have a chance to vote again.</strong></p>
        <p>Feel free to modify your vote with the slider or simply submit the same vote:</p>
      </div>
    );
  };
   
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

  // TO DO - slider and code breaks when selected value is 0 - why is 0 considered null?? 

  console.log("Current vote:", player.get("currentVote"));
  //console.log("Current score:", player.get("currentScore"));
  //console.log("Others:", player.get("alterIds"));
  console.log("Vote:", player.round.get("vote"));
  
  return (
    <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
      
      {result}

      {prompt}
      <br />
      <Slider
        aria-label="Your vote"
        value={player.round.get("vote")}
        onChange={handleChange}
        min={0}
        step={1}
        max={100}
        valueLabelDisplay="on"
      />

      <Button handleClick={handleSubmit} primary>
        Submit
      </Button>
    </div>
  );
}



