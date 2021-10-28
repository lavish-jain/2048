const Tile = require("./Tile");

class Board {
  constructor(size, base, winValue, playBeyondWin) {
    if (!size || typeof size !== "number" || size % 1 !== 0)
      throw new Error("invalid grid size");
    if (!base || typeof base !== "number" || base % 1 !== 0)
      throw new Error("invalid  base value");
    if (!winValue || typeof winValue !== "number" || winValue % 1 !== 0)
      throw new Error("invalid win value");
    if (typeof playBeyondWin !== "boolean")
      throw new Error("invalid playBeyondWin");
    this.size = size;
    this.base = base;
    this.winValue = winValue;
    this.playBeyondWin = playBeyondWin;
    this.grid = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = null;
      }
    }
    this.#AddTileAtRandomLocation();
    this.#AddTileAtRandomLocation();
  }
  #AddTileAtRandomLocation() {
    if (this.checkLose()) return;
    let x = Math.floor(Math.random() * this.size),
      y = Math.floor(Math.random() * this.size);
    while (this.grid[x][y] !== null) {
      x = Math.floor(Math.random() * this.size);
      y = Math.floor(Math.random() * this.size);
    }
    this.grid[x][y] = new Tile(this.base);
  }

  moveLeft() {
    for (let i = 0; i < this.size; i++) {
      let j = 0;
      while (j < this.size) {
        if (!this.grid[i][j]) {
          j++;
          continue;
        }
        let k = j + 1;
        for (; k < this.size; k++) {
          if (this.grid[i][k]) break;
        }
        if (k < this.size && this.grid[i][j].value === this.grid[i][k].value) {
          this.#merge(i, j, i, k);
        }
        for (let l = j - 1; l >= 0; l--) {
          if (!this.grid[i][l]) {
            this.grid[i][l] = new Tile(this.grid[i][l + 1].value);
            this.grid[i][l + 1] = null;
          } else break;
        }
        j = k;
      }
    }
    this.#AddTileAtRandomLocation();
  }
  moveRight() {
    for (let i = this.size - 1; i >= 0; i--) {
      let j = this.size - 1;
      while (j >= 0) {
        if (!this.grid[i][j]) {
          j--;
          continue;
        }
        let k = j - 1;
        for (; k >= 0; k--) {
          if (this.grid[i][k]) break;
        }
        if (k >= 0 && this.grid[i][j].value === this.grid[i][k].value) {
          this.#merge(i, j, i, k);
        }
        for (let l = j + 1; l < this.size; l++) {
          if (!this.grid[i][l]) {
            this.grid[i][l] = new Tile(this.grid[i][l - 1].value);
            this.grid[i][l - 1] = null;
          } else break;
        }
        j = k;
      }
    }
    this.#AddTileAtRandomLocation();
  }
  moveUp() {
    for (let j = 0; j < this.size; j++) {
      let i = 0;
      while (i < this.size) {
        if (!this.grid[i][j]) {
          i++;
          continue;
        }
        let k = i + 1;
        for (; k < this.size; k++) {
          if (this.grid[k][j]) break;
        }
        if (k < this.size && this.grid[i][j].value === this.grid[k][j].value) {
          this.#merge(i, j, k, j);
        }
        for (let l = i - 1; l >= 0; l--) {
          if (!this.grid[l][j]) {
            this.grid[l][j] = new Tile(this.grid[l + 1][j].value);
            this.grid[l + 1][j] = null;
          } else break;
        }
        i = k;
      }
    }
    this.#AddTileAtRandomLocation();
  }
  moveDown() {
    for (let j = this.size - 1; j >= 0; j--) {
      let i = this.size - 1;
      while (i >= 0) {
        if (!this.grid[i][j]) {
          i--;
          continue;
        }
        let k = i - 1;
        for (; k >= 0; k--) {
          if (this.grid[k][j]) break;
        }
        if (k >= 0 && this.grid[i][j].value === this.grid[k][j].value) {
          this.#merge(i, j, k, j);
        }
        for (let l = i + 1; l < this.size; l++) {
          if (!this.grid[l][j]) {
            this.grid[l][j] = new Tile(this.grid[l - 1][j].value);
            this.grid[l - 1][j] = null;
          } else break;
        }
        i = k;
      }
    }
    this.#AddTileAtRandomLocation();
  }
  #merge(x1, y1, x2, y2) {
    this.grid[x1][y1].setValue(
      this.grid[x1][y1].value + this.grid[x2][y2].value
    );
    this.grid[x2][y2] = null;
  }

  printBoard() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let val = this.grid[i][j] ? this.grid[i][j].value : "-";
        process.stdout.write(val + " ");
      }
      console.log();
    }
    console.log();
  }

  checkLose() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] == null) return false;
        if (i < this.size - 1) {
          if (this.grid[i + 1][j] == null) return false;
          if (this.grid[i][j].value == this.grid[i + 1][j].value) return false;
        }
        if (j < this.size - 1) {
          if (this.grid[i][j + 1] == null) return false;
          if (this.grid[i][j].value == this.grid[i][j + 1].value) return false;
        }
      }
    }
    return true;
  }
  checkWin() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] && this.grid[i][j].value >= this.winValue)
          return true;
      }
    }
    return false;
  }
}

module.exports = Board;
