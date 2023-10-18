/* Appel des fonctions */

$(document).ready(function () {
  let game = new CreateGame();
  movementFight = new MovementFight();
  game.createMap(board)
  let tableauMurs = game.createWalls();
  let tableauArmes = game.popWeapons(tableauMurs);
  tableauJoueurs = game.popPlayers(tableauMurs, tableauArmes);
  currentPlayer = tableauJoueurs[0];
  movementFight.greyscaleAround(currentPlayer);
});