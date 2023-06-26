import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React from "react";
import { Game } from "./Game";
import { GameConsent } from "./intro/GameConsent";
import { Instructions } from "./intro/Instructions";
import { Quiz } from "./intro/Quiz";
import { FinalOutcome } from "./exit/FinalOutcome";
import { ExitSurvey } from "./exit/ExitSurvey";
import { PaymentInfo } from "./exit/PaymentInfo";
import { Sorry } from "./exit/Sorry";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerKey = urlParams.get("participantKey") || "";

  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/query`;

  function introSteps({ game, player }) {
    return [Instructions, Quiz];
  }

  function exitSteps({ game, player }) {
    return [FinalOutcome, ExitSurvey, PaymentInfo];
  }


  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <EmpiricaMenu position="bottom-left" />
        <div className="h-full overflow-auto">
          <EmpiricaContext consent={GameConsent} introSteps={introSteps} 
              exitSteps={exitSteps}>
            <Game />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}


//exitSteps={({ game, player }) =>  player.get("ended") === "finished" ? {exitSteps} : [Sorry]}>