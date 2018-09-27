const mongoose = require('mongoose');


/**
 * Randomly seeds mines in cells
 * @param {Array} board
 * @param {Number} mines
 */
function seedMines(cells, mines) {
  for (let i = 0; i < mines; i += 1) {
    const randRow = Math.floor(Math.random() * cells.length);
    const randCol = Math.floor(Math.random() * cells.length);
    const cell = cells[randRow][randCol];
    if (!cell.mine) {
      cell.mine = true;
    } else {
      i -= 1;
    }
  }
}

/**
 * Game Schema
 * @private
 */
const gameSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  finished: Boolean,
  settings: {
    rows: Number,
    cols: Number,
    mines: Number,
  },
  cells: [[
    {
      mine: Boolean,
      flag: Boolean,
      neighbourCount: Number,
    },
  ]],
}, {
  timestamps: true,
});

/**
 * Virtuals
 */
gameSchema.virtual('boardSize').get(function () {
  return this.settings.rows * this.settings.cols;
});

gameSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id', 'created_at'];
    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },
  reveal(rowParam, colParam) {
    const adjacentsCells = [
      { row: -1, col: -1 },
      { row: -1, col: 0 },
      { row: -1, col: 1 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ];
    if (this.cells[rowParam][colParam].mine) {
      return this.update({ finished: true });
    }
    return adjacentsCells.map((x) => {
      const checkingRow = rowParam + x.row;
      const checkingCol = colParam + x.col;
      if (!this.cells[checkingRow][checkingCol].mine) {
        return {
          row: checkingRow,
          col: checkingCol,
        };
      }
    });
  },
});
/**
 * Statics
 */
gameSchema.statics = {
  /**
   * Configs a new game object with random mines
   * @param {Number} rows
   * @param {Number} cols
   * @param {Number} mines
   */
  async config(size, mines) {
    const cells = new Array(size);
    for (let i = 0; i < size; i += 1) {
      cells[i] = [];
      for (let j = 0; j < size; j += 1) {
        cells[i][j] = { mine: false };
      }
    }
    seedMines(cells, mines);
    return {
      settings: {
        mines,
      },
      cells,
    };
  },
};


/**
 * @typedef Game
 */
module.exports = mongoose.model('Game', gameSchema);
