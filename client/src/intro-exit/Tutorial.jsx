import React, { useState } from "react";
import { Button} from "../components/Button";
import { RadioGroup } from "../components/RadioGroup";

const maxScore = 220
const minScore = 18
const convert100 = "$2.00"
const basepay = "$1.00"



function Overview({ setPage }) {

  // TO ADD VISUALIZATIONS
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-2xl leading-6 font-medium text-gray-900">
        Welcome to the Voting game!
      </h3>
      <br />

      <div className="mt-2 mb-6">
        <p>
        You have been assigned to a group of 24 participants. 
        Each of you is randomly awarded a given amount between {minScore} and {maxScore} points.
        </p>
        <br />
        
        <p>
        The decisions you and the other 23 participants make will affect your score
        and your score will determine the amount you will be paid upon completing the study.
        </p>
        <br />
      </div>

      <div className="grid grid-cols-2 items-center">
        <div className="text-left"></div>
        <div className="text-right">
          <Button handleClick={() => setPage("Voting")} autoFocus>
            <p>Next</p>
          </Button>
          </div>
      </div>
    </div>
  );
}


function Voting({ setPage }) {

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-2xl leading-6 font-medium text-gray-900">
        Voting for tax
      </h3>
      <br />

      <div className="mt-2 mb-6">
        <p>
        <strong>You and the other 23 participants in your group get to vote on a tax rate</strong> and
        the tax rate the group selects will affect everyone's score.
        If the group selects a tax rate of X%, then X% of each participant's award 
        will be subtracted and the total collected amount will be distributed equally 
        among everyone in the group.
        </p>
        <br />
        
        <p> 
        <strong>The group tax rate will be determined by the median vote.</strong> For
        instance, if the votes in a group of five participants are 2%, 5%, 20%, 35%, and 70%, 
        then the vote in the middle, which is 20%, will be selected.
        </p>
      </div>

      <div className="grid grid-cols-2 items-center">
        <div className="text-left">
          <Button handleClick={() => setPage("Overview")} autoFocus>
            <p>Previous</p>
          </Button>
       </div>
       <div className="text-right">
          <Button handleClick={() => setPage("Outcomes")} autoFocus>
            <p>Next</p>
          </Button>
        </div>
      </div>

    </div>
  );
}

function Outcomes({ setPage }) {

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-2xl leading-6 font-medium text-gray-900">
        Final scores
      </h3>
      <br />

      <div className="mt-2 mb-6">
        <p> 
        Although the tax rate depends on the votes of all 24 participants, <strong>you 
        will be able to observe the scores of 8 other participants</strong> only.   
        All votes are anonymous and you will be informed only of the collectively selected tax rate 
        and the resulting scores of thos eyou observe. <strong>You will not know how specific individuals 
        voted and similarly, others will not know how you voted.</strong>
        </p>
        <br />

        <p> 
        <strong>The group will vote in three rounds in order to select a final 
        tax rate.</strong> You have 30 seconds per round to make and submit your decision.
        The score you obtain as a result of the tax rate selected in the final round
        will be paid to you as a bonus at the exchange rate of 100 points = {convert100},
        in addition to the {basepay} you will receive for completing the study.
        </p>
      </div>

      <div className="grid grid-cols-2 items-center">
        <div className="text-left">
          <Button handleClick={() => setPage("Voting")} autoFocus>
            <p>Previous</p>
          </Button>
        </div>

        <div className="text-right">
          <Button handleClick={() => setPage("Quiz")} autoFocus>
            <p>Next</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ADD QUIZ - cannot proceed until have it right
function Quiz({ setPage, next }) {

  const labelClassName = "block text-sm font-medium text-gray-700 my-2";

  const [correct1, setCorrect1] = useState(undefined);
  const [input1, setInput1] = useState("");
  const answer1 = "50";

  const [correct2, setCorrect2] = useState(undefined);
  const [input2, setInput2] = useState("");
  const answer2 = "24-8";

  const [correct3, setCorrect3] = useState(undefined);
  const [input3, setInput3] = useState("");
  const answer3 = "100-20-24";

  const handleSubmit = (event) => {
    event.preventDefault();
    setCorrect1(input1 == answer1);
    setCorrect2(input2 == answer2);
    setCorrect3(input3 == answer3);
    if ((input1 == answer1) && (input2 == answer2) && (input3 == answer3)) {
      // continue to the next step if everything is correct
      next();
    }
  };

  const renderWarning = () => {
    return (
      <div className="text-red-500 text-xl pb-4 pt-4">
        <p> This answer is incorrect. Please try again or go
                back to the instructions.</p>
      </div>
    );
  };

  return (
    <div className="mt-3 sm:mt-5 p-20">

      <h3 className="text-2xl leading-6 font-medium text-gray-900">
        Quiz
      </h3>
      <br />

      <div className="mt-2 mb-6">
        <p> 
        Let's make sure you understand the instructions.
        </p>
      </div>

      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
        </div>

        <div>
          <RadioGroup
              label="According to the rules, the median tax vote will be selected.
              Assume there are two other voters in your group. 
              If you vote for 40% and the others vote for 50% and 90%,
              then what will be the selected tax rate?"
              options={[
                { key: "40", value: "40%" },
                { key: "50", value: "50%" },
                { key: "60", value: "60%" },
                { key: "90", value: "90%" },
              ]}
              selected={input1}
              onChange={(e) => setInput1(e.target.value)}
              testId="Q1"
            />
            {correct1 === false && renderWarning()}
            <br />

            <RadioGroup
              label="Which of the following statements is true?"
              options={[
                { key: "24-8", value: "There are 24 voters in the group, but I can only observe the score of 8 of them." },
                { key: "24-24", value: "There are 24 voters in the group, and I can observe their scores." },
                { key: "8-8", value: "There are 8 voters in the group, and I can observe their scores." },
                { key: "8-24", value: "There are 8 voters in the group, but I can observe the score of 24 others." },
              ]}
              selected={input2}
              onChange={(e) => setInput2(e.target.value)}
              testId="Q2"
            />
            {correct2 === false && renderWarning()}
            <br />

            <RadioGroup
              label="Imagine your initial score is 100 and the group selects a tax rate of 20%. 
              Which of the following describes how your score will change?"
              options={[
                { key: "100-20", value: "100 initial score - 20 paid tax" },
                { key: "100-20-8", value: "100 initial score - 20 paid tax + (all tax contributions from 8 voters / 8)" },
                { key: "100-20-24", value: "100 initial score - 20 paid tax + (all tax contributions from 24 voters / 24)" },
                { key: "120", value: "120" },
              ]}
              selected={input3}
              onChange={(e) => setInput3(e.target.value)}
              testId="Q3"
            />
            {correct3 === false && renderWarning()}
            <br />

        </div>
      </form>
      
      
      <br />
      <div className="grid grid-cols-2 items-center">
        <div className="text-left">
          <Button handleClick={() => setPage("Overview")} autoFocus>
            <p>Instructions</p>
          </Button>
        </div>

        <div className="text-right">
          <Button handleClick={handleSubmit} autoFocus>
            <p>Submit</p>
          </Button>
        </div>
      </div>
      

    </div>
  )
}


export function Tutorial({ next }) {

  const [page, setPage] = useState("Overview");

  // TO ADD VISUALIZATIONS, POSSIBLY MULTIPLE PAGES
  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {page === "Overview" && <Overview setPage={setPage} />}
        {page === "Voting" && <Voting setPage={setPage} />}
        {page === "Outcomes" && <Outcomes setPage={setPage} />}
        {page === "Quiz" && <Quiz setPage={setPage} next={next}/>}
    </div>
  );
}