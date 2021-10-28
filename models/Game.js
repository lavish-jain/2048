const Board = require("./Board");

class Game {
  #defaultSize = 4;
  #defaultWinValue = 2048;
  #defaultPlayBeyondWin = false;
  #defaultBaseValue = 2;
  constructor(size, baseValue, winValue, playBeyondWin) {
    if (!size) this.size = this.#defaultSize;
    else if (typeof size !== "number" || size % 1 !== 0) {
      console.warn(
        `invalid grid size ${size}, choosing default size of ${
          this.#defaultSize
        } x ${this.#defaultSize}`
      );
      this.size = this.#defaultSize;
    } else {
      this.size = size;
    }

    if (!baseValue) this.baseValue = this.#defaultBaseValue;
    else if (typeof baseValue !== "number" || baseValue % 1 !== 0) {
      console.warn(
        `invalid base value ${baseValue}, choosing default base value of ${
          this.#defaultBaseValue
        }`
      );
      this.baseValue = this.#defaultBaseValue;
    } else {
      this.baseValue = baseValue;
    }

    if (!winValue) this.winValue = this.#defaultWinValue;
    else if (typeof winValue !== "number" || winValue % 1 !== 0) {
      console.warn(
        `invalid win value ${winValue}, choosing default win value of ${
          this.#defaultWinValue
        }`
      );
      this.winValue = this.#defaultWinValue;
    } else {
      this.winValue = winValue;
    }
    if (!playBeyondWin) this.playBeyondWin = this.#defaultPlayBeyondWin;
    else this.playBeyondWin = playBeyondWin;
    this.board = new Board(
      this.size,
      this.baseValue,
      this.winValue,
      this.playBeyondWin
    );
    this.board.printBoard();
  }
  move(m) {
    switch (m) {
      case 0:
        this.board.moveLeft();
        break;
      case 1:
        this.board.moveRight();
        break;
      case 2:
        this.board.moveUp();
        break;
      case 3:
        this.board.moveDown();
        break;
      default:
        throw new Error("invalid move, try again");
    }
    this.board.printBoard();
    if (this.board.checkLose()) return this.endGame(false);
    else if (this.board.checkWin()) {
      if (!this.playBeyondWin) return this.endGame(true);
    }
    return null;
  }
  setPlayBeyondWin(val) {
    if (typeof val !== "boolean") throw new Error("invalid parameter val");
    this.playBeyondWin = val;
  }
  endGame(win) {
    if (typeof win !== "boolean") throw new Error("invalid parameter win");
    if (!win) {
      console.log("Game over!");
      return false;
    } else {
      console.log("Congratulations, you have won!");
      return true;
    }
  }
}

// const game = new Game();
// game.board.printBoard();
// game.move(0);
// game.move(1);
// game.move(2);
// game.move(3);
// game.move(0);
// game.move(1);
// game.move(2);
// game.move(3);
module.exports = Game;
