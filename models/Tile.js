class Tile {
  constructor(value) {
    if (!value || typeof value !== "number" || value % 1 !== 0)
      throw new Error("invalid value in tile");
    this.value = value;
  }
  setValue(value) {
    if (!value || typeof value !== "number" || value % 1 !== 0)
      throw new Error("invalid value in tile");
    this.value = value;
  }
}

module.exports = Tile;
