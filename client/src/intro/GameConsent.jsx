import { Consent } from "@empirica/core/player/react";

export function GameConsent({ onConsent }) {
  return (
    <Consent
      title="Consent to participate"
      text="This experiment is part of a scientific project conducted by researchers form
      the London School of Economics and Political Science and the Santa Fe Institute. 
      Your decision to participate in this experiment is entirely voluntary. 
      There are no known or anticipated risks to participating.
      Your responses and interactions will be anonymous. 
      The results of our research may be presented at scientific meetings 
      and published in scientific journals. 
      Clicking on the I AGREE button indicates that you are at
      least 18 years of age, and agree to participate voluntarily."
      buttonText="I AGREE"
    />
  );
}

