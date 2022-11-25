class TicTacToe {
  constructor() {
    this.board = Array(9).fill(0);
    this.moves = [];
    this.isWin = false;
    this.isDraw = false;
  }

  get player() {
    return 1 + (this.moves.length % 2);
  }

  get isMoves() {
    return [...this.board.keys()].filter((i) => !this.board[i]);
  }

  play(move) {
    if (this.board[move] !== 0 || this.isWin) return false;

    this.board[move] = this.player;
    this.moves.push(move);

    const regex =
      /^(?:...)*([12])\1\1|^.?.?([12])..\2..\2|^([12])...\3...\3|^..([12]).\4.\4/;
    this.isWin = regex.test(this.board.join(""));
    this.isDraw = !this.isWin && this.moves.length === this.board.length;

    return true;
  }

  undo() {
    if (this.moves.length === 0) return false;

    this.board[this.moves.pop()] = 0;
    this.isWin = false;
    this.isDraw = false;

    return true;
  }

  minimax() {
    if (this.isWin) return { value: -10 };
    if (this.isDraw) return { value: 0 };

    let best = { value: -Infinity };

    for (let move of this.isMoves) {
      this.play(move);
      let { value } = this.minimax();
      this.undo();

      value = value ? (Math.abs(value) - 1) * Math.sign(-value) : 0;
      if (value >= best.value) {
        if (value > best.value) best = { value, moves: [] };
        best.moves.push(move);
      }
    }

    return best;
  }

  goodMove() {
    let { moves } = this.minimax();
    return moves[Math.floor(Math.random() * moves.length)];
  }
}
