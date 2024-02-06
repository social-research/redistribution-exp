import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React from "react";
import { Game } from "./Game";
import { GameConsent } from "./intro-exit/GameConsent";
import { Tutorial } from "./intro-exit/Tutorial";
import { Lobby } from "./intro-exit/Lobby";
import { FinalOutcome } from "./intro-exit/FinalOutcome";
import { ExitSurvey } from "./intro-exit/ExitSurvey";
import { PaymentInfo } from "./intro-exit/PaymentInfo";


export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerKey = urlParams.get("participantKey") || "";

  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/query`;

  function introSteps({ game, player }) {
    return [Tutorial];
  }

  function exitSteps({ player }) {
    if (player.get("ended") === "game ended") {
      return [FinalOutcome, ExitSurvey, PaymentInfo];
    } else {
      return [];
    }
  }


  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <EmpiricaMenu position="bottom-left" />
        <div className="h-full overflow-auto">
          <EmpiricaContext 
              consent={GameConsent} 
              introSteps={introSteps} 
              lobby={Lobby}
              exitSteps={exitSteps}>
            <Game />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}

// TO DO!!! - Update Sorry.jsx, integrate with Game and test
//exitSteps={({ game, player }) =>  player.get("ended") === "finished" ? {exitSteps} : [Sorry]}>