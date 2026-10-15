import Phaser from "phaser";

export default class TicTacToeScene extends Phaser.Scene {
  constructor() {
    super({ key: "TicTacToeScene" });
    this.cellSize = 140;
    this.gridOffset = { x: 60, y: 60 };
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.currentPlayer = "X";
    this.gameOver = false;
  }

  preload() {}

  create() {
    this.drawGrid();
    this.input.on("pointerdown", (pointer) => {
      if (this.gameOver) return;
      const localX = pointer.x - this.gridOffset.x;
      const localY = pointer.y - this.gridOffset.y;
      const col = Math.floor(localX / this.cellSize);
      const row = Math.floor(localY / this.cellSize);
      if (col >= 0 && col < 3 && row >= 0 && row < 3) {
        if (!this.board[row][col]) {
          this.makeMove(row, col, "X");
          if (!this.gameOver) this.aiMove();
        }
      }
    });

    this.statusText = this.add.text(10, 420, "Your move (X)", { fontSize: "18px", color: "#222" });
    this.drawMarks();
  }

  drawGrid() {
    const g = this.add.graphics();
    g.lineStyle(4, 0x222222);
    for (let i = 1; i <= 2; i++) {
      // vertical
      g.strokeLineShape(new Phaser.Geom.Line(
        this.gridOffset.x + i * this.cellSize,
        this.gridOffset.y,
        this.gridOffset.x + i * this.cellSize,
        this.gridOffset.y + 3 * this.cellSize
      ));
      // horizontal
      g.strokeLineShape(new Phaser.Geom.Line(
        this.gridOffset.x,
        this.gridOffset.y + i * this.cellSize,
        this.gridOffset.x + 3 * this.cellSize,
        this.gridOffset.y + i * this.cellSize
      ));
    }
  }

  drawMarks() {
    if (this.marksGroup) this.marksGroup.clear(true, true);
    this.marksGroup = this.add.group();
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const val = this.board[r][c];
        if (val) {
          const x = this.gridOffset.x + c * this.cellSize + this.cellSize / 2;
          const y = this.gridOffset.y + r * this.cellSize + this.cellSize / 2;
          const txt = this.add.text(x, y, val, {
            fontSize: "96px",
            color: val === "X" ? "#d32f2f" : "#1976d2",
            align: "center"
          }).setOrigin(0.5);
          this.marksGroup.add(txt);
        }
      }
    }
  }

  makeMove(row, col, player) {
    if (this.board[row][col] || this.gameOver) return;
    this.board[row][col] = player;
    this.drawMarks();
    const winner = this.checkWinner();
    if (winner) {
      this.endGame(winner);
    } else if (this.isBoardFull()) {
      this.endGame("draw");
    }
  }

  aiMove() {
    // very simple random AI (for preview)
    const empties = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (!this.board[r][c]) empties.push({ r, c });
      }
    }
    if (empties.length === 0) return;
    const pick = Phaser.Math.RND.pick(empties);
    this.time.delayedCall(300, () => {
      this.makeMove(pick.r, pick.c, "O");
      this.statusText.setText("Your move (X)");
    });
  }

  checkWinner() {
    const b = this.board;
    // rows
    for (let r = 0; r < 3; r++) {
      if (b[r][0] && b[r][0] === b[r][1] && b[r][1] === b[r][2]) return b[r][0];
    }
    // cols
    for (let c = 0; c < 3; c++) {
      if (b[0][c] && b[0][c] === b[1][c] && b[1][c] === b[2][c]) return b[0][c];
    }
    // diags
    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return b[0][0];
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return b[0][2];
    return null;
  }

  isBoardFull() {
    return this.board.every((row) => row.every((c) => c));
  }

  endGame(result) {
    this.gameOver = true;
    if (result === "draw") {
      this.statusText.setText("Draw! Refresh to play again.");
    } else {
      this.statusText.setText(`${result} wins! Refresh to play again.`);
    }
    // simple visual: draw a translucent overlay
    this.add.rectangle(240, 240, 480, 480, 0x000000, 0.15);
  }
}
