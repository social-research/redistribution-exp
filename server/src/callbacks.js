import { ClassicListenersCollector } from "@empirica/core/admin/classic";
import { numRounds, conversionRate,
         richscore, poorscore, two_net, four_net, nine_net,
         homophil_net, heterophil_net,
         richvis_net, poorvis_net,
         segregated_net, representative_net} from "./constants";

export const Empirica = new ClassicListenersCollector();


// onGameStart is triggered once per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart(({ game }) => {

  console.log("game", game.id, "started");
  
  const treatment = game.get("treatment");
  const playerCount = treatment.playerCount;
  const netType = treatment.netType;

  // TO DO !!! - Make sure order does not get messed up - check correct neighbor assignment  
  const awards = getAwards(playerCount)
  const playerIds = [] 
  game.players.forEach((player, i) => {
    // Keep in same order as awards to do the correct network assignment
    player.set("playerID", player.id);
    player.set("playerIndex", i);
    playerIds[i] = player.id;
    player.set("award", awards[i]);
    player.set("currentScore", awards[i]);
    player.set("currentVote", null);
    player.set("bonus", 0);
  });
  
  // Set neighbors
  game.players.forEach((player, i) => {
    const alterIds = getAlters(i, playerIds, netType, playerCount);
    player.set("alterIds", alterIds);
    //console.log(player.get("alterIds")); // REMOVE!!!
  });

  // Add round and stages
  for (let i = 0; i < numRounds; i++) {
    const round = game.addRound({
      name: `Round ${i+1}`,
    });
    round.addStage({ name: "vote", duration: 300 }); // 300 seconds - UPDATE TO 30 seconds
  }

  // Keep track of median vote
  game.set("currentMedianVote", null);
});


Empirica.onRoundStart(({ round }) => {
  console.log("round", round.get("index"), "started");

  const players = round.currentGame.players;
  players.forEach(player => {
    player.round.set("vote", player.get("currentVote"));
  });
  // Keep track of medianVote
  round.set("medianVote", null);
  // Display outcome from previous round, except for the first round
  round.set("displayResult", (round.get("index") > 0));
});


Empirica.onStageStart(({ stage }) => {
  console.log("stage", stage.get("name"), "started");  
});


Empirica.onStageEnded(({ stage }) => {
  console.log("stage", stage.get("name"), "ended");
});


Empirica.onRoundEnded(({ round }) => {
  console.log("round", round.get("index"), "ended");

  const players = round.currentGame.players;

  // Determine median vote
  const medianVote = calculateMedianVote(round);
  round.set("medianVote", medianVote);

  // Determine tax benefit everyone gets
  const taxBenefit = calculateTaxBenefit(players, medianVote);
  round.set("taxBenefit", taxBenefit);

  // Estimate each player's new score and update player.round.score
  updatePlayerScores(round, medianVote, taxBenefit);

  // Update global trackers
  round.currentGame.set("currentMedianVote", medianVote);
  players.forEach(player => {
    player.set("currentScore", player.round.get("score"));
    player.set("currentVote", player.round.get("vote"));
  });
});

Empirica.onGameEnded(({ game }) => {
  console.log("The game", game.id, "has ended");

  game.players.forEach(player => {
    const bonus = Math.round(player.get("currentScore") * conversionRate * 100) / 100;
    player.set("bonus", bonus);
  });
});


// Helper functions below //


function getAlters(playerIndex, playerIds, netType, playerCount) {

  // Use the hard-coded network structure to create the network
  let alterIds = [];
  if (playerCount === 2) {
    alterIds = two_net[playerIndex].map(i => playerIds[i]);
  } else if (playerCount === 4) {
    alterIds = four_net[playerIndex].map(i => playerIds[i]);
  } else if (playerCount === 9) {
    alterIds = nine_net[playerIndex].map(i => playerIds[i]);
  } else if (netType === "homophil") {
    alterIds = homophil_net[playerIndex].map(i => playerIds[i]);
  } else if (netType === "heterophil") {
    alterIds = heterophil_net[playerIndex].map(i => playerIds[i]);
  } else if (netType === "richvis") {
    alterIds = richvis_net[playerIndex].map(i => playerIds[i]);
  } else if (netType === "poorvis") {
    alterIds = poorvis_net[playerIndex].map(i => playerIds[i]);
  } else if (netType === "segregated") {
    alterIds = segregated_net[playerIndex].map(i => playerIds[i]);
  } else if (netType === "representative") {
    alterIds = representative_net[playerIndex].map(i => playerIds[i]);
  };

  // Randomize order of neighbors - this is how they will be displayed on screen
  return alterIds; //return _.shuffle(alterIds);  // FIX!!!!!!!!!!
}


function getAwards(playerCount) {

  // Include random variation of +/- 10%
  const randomvar1 = [-0.1, -0.08, -0.06, -0.04, -0.02, 0, 0, 0.02, 0.04, 0.06, 0.08, 0.1];
  //const randomvar1 = _.shuffle([-0.1, -0.08, -0.06, -0.04, -0.02, 0, 0, 0.02, 0.04, 0.06, 0.08, 0.1]); //FIX!!!!

  const randomvar2 = Object.assign([], randomvar1); 
  //const randomvar2 = _.shuffle(randomvar1)); // clone randomvar1 FIX!!!!!!!!
  
  const awards = {};
  for (var i = 0; i < playerCount; i++) {
    if (i % 2 === 0) {
      awards[i] = Math.round(( 1 + randomvar1[i] ) * poorscore);
    } else {
      awards[i] = Math.round(( 1 + randomvar2[i] ) * richscore);
    }
  };
  return awards;
}


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  // Round to whole number if need to average middle two values  
  return arr.length % 2 !== 0 ? nums[mid] : Math.round((nums[mid - 1] + nums[mid]) / 2);
};


function calculateMedianVote(round) {

  const players = round.currentGame.players;

  // Collect all votes - SYNTAX can be simplified with lodash!!!
  const votes = [];
  for (const player of players) {
    // Only count submitted votes
    const playerVote = player.round.get("vote");
    if (playerVote !== undefined && playerVote !== null) {
      votes.push(playerVote);
    };
  };

  const medianVote = median(votes);
  return medianVote;
}

function calculateTaxBenefit(players, medianVote) {
  let revenue = 0;
  for (const player of players) {
    const tax = Math.round(medianVote * player.get("award") / 100);
    revenue += tax;
  };
  const benefit = Math.round(revenue / players.length);
  return benefit;
}

function updatePlayerScores(round, medianVote, taxBenefit) {

  const players = round.currentGame.players;

  // For each player, subtract tax and add benefit
  players.forEach(player => {
    const award = player.get("award");
    const score = award - Math.round(medianVote * award / 100) + taxBenefit;
    player.round.set("score", score);
  });
}
