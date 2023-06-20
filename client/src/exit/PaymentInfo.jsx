import { usePlayer } from "@empirica/core/player/classic/react";
import React from "react";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";

export function PaymentInfo({ next }) {

  const player = usePlayer();

  // Show bonus in format $X.XX  - TO DO !!!
  
  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <br />
      <Alert title="Payment Information">
        <p>
          Please submit the following code to receive your bonus:{" "}
          <strong>{player.id}</strong>
        </p>
        <p className="pt-1">
          You will be paid a <strong>bonus of ${player.get("bonus")}</strong> in addition to the{" "}
          <strong>$1 base reward</strong> for completing the HIT.
        </p>
      </Alert>

      <br />
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
            
    </div>
  );
  }
