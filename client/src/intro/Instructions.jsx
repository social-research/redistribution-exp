import React from "react";
import { Button } from "../components/Button";

const richScore = 200
const poorScore = 20
const convert100 = "$1.00"

export function Instructions({ next }) {

  // TO ADD VISUALIZATIONS, POSSIBLY MULTIPLE PAGES
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-2xl leading-6 font-medium text-gray-900">
        Welcome to the Voting game!
      </h3>
      <br />

      <div className="mt-2 mb-6">
        <p>
        You have been assigned to a group of 24 participants. 
        Each of you is randomly awarded a given amount, ranging from {poorScore} to {richScore} points.
        Your score will determine the amount you will be paid upon completing the study.
        The decisions you and the other 23 participants make will affect your score.
        </p>
        <br />
        
        <p>
        <strong>You and the other 23 participants in your group get to vote on a tax rate</strong> 
        and the tax rate the group selects will affect everyone's score.
        If the group selects a tax rate x%, x% of each participant's award 
        will be subtracted and the total collected tax will be then distributed equally among everyone in the group.
        </p>
        <br />
        
        <p> 
        <strong>The group tax rate will be determined by the median vote.</strong> 
        For instance, if the votes in a group of five particiants are 2%, 5%, 20%, 35%, and 70%, 
        then the middle vote of 20% will be selected.
        </p>
        <br />

        <p> 
        Although the tax rate depends on the votes of all 24 participants, 
        <strong>you will be able to observe the scores of eight other participants</strong> only.   
        All votes are anonymous and you will be informed of the collectively selected tax rate 
        and the resulting scores of the eight others. You will not know how specific individuals 
        voted and similarly, others will not know how you voted.
        </p>
        <br />

        <p> 
        The group will vote in three rounds in order to select a final tax rate. 
        You will get 30 seconds per round to make and submit your decision.
        The score you obtain as a result of the finalized tax rate 
        will be paid to you as a bonus at the exchange rate of 100 points = {convert100}.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
