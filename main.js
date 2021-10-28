const { resolve } = require("path/posix");
const readline = require("readline");
const Game = require("./models/Game");

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.addListener("close", () => {
    console.log("Thanks for playing!");
    process.exit(0);
  });
  startGame(rl);
};

const startGame = async (rl) => {
  let size, baseValue, winValue, playBeyondWin;
  playBeyondWin = false;
  await new Promise((resolve, reject) => {
    rl.question(
      "Enter the size of grid you want to play: \nFor eg, enter 5 for 5x5 grid \nHit enter to use default (4x4)",
      (userInput) => {
        size = Number(userInput.trim());
        resolve();
      }
    );
  });
  await new Promise((resolve, reject) => {
    rl.question(
      "Enter the base value you want to play with (default: 2)",
      (userInput) => {
        baseValue = Number(userInput.trim());
        resolve();
      }
    );
  });
  await new Promise((resolve, reject) => {
    rl.question("Enter the winning value (default: 2048)", (userInput) => {
      winValue = Number(userInput.trim());
      resolve();
    });
  });
  console.log("Beginning the game...");
  console.log(
    "Move instructions: When prompted to make a move (left, right, up or down), use the following: \n 0: move left \n 1: move right \n 2: move up \n 3: move down"
  );
  console.log("At any point, to quit, hit 'q'");
  console.log("This is your starting board:");
  const game = new Game(size, baseValue, winValue, playBeyondWin);
  while (true) {
    try {
      await new Promise((resolve, reject) => {
        rl.question("Enter your move: ", (userInput) => {
          if (userInput.trim().toLowerCase() === "q") {
            rl.close();
            resolve();
          }
          let m = Number(userInput.trim());
          console.log(typeof m);
          if (isNaN(m) || m < 0 || m > 3) {
            console.log("invalid move, try again");
            resolve();
            return;
          }
          let over = game.move(m);
          if (over === null) {
            resolve();
            return;
          }
          if (over === true && !playBeyondWin) {
            // game won
            rl.question("Do you want to continue playing (y/n)?", (ans) => {
              if (ans.trim().toLowerCase() == "y") {
                playBeyondWin = true;
                game.setPlayBeyondWin(playBeyondWin);
                resolve();
              } else {
                rl.question("Do you want to restart (y/n)?", (restart) => {
                  if (restart.trim().toLowerCase() === "y") {
                    startGame(rl);
                    resolve();
                  } else rl.close();
                });
              }
            });
          } else if (over === false) {
            rl.question("Do you want to play again (y/n)?", (restart) => {
              if (restart.trim().toLowerCase() == "y") startGame(rl);
              else rl.close();
            });
          }
        });
      });
    } catch (err) {}
  }
};

main();
