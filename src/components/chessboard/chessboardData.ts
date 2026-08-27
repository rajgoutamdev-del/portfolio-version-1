export type PieceColor = 'white' | 'black';
export type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';

export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  square: string;
}

const GLYPHS: Record<PieceType, string> = {
  K: '♚',
  Q: '♛',
  R: '♜',
  B: '♝',
  N: '♞',
  P: '♟',
};

export function glyphFor(type: PieceType): string {
  return GLYPHS[type];
}

export function squareToPercent(square: string): { left: number; top: number } {
  const file = square.charCodeAt(0) - 97;
  const rank = Number(square[1]);
  return { left: file * 12.5, top: (8 - rank) * 12.5 };
}

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const backRank: PieceType[] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];

function initialPieces(): Piece[] {
  const pieces: Piece[] = [];
  files.forEach((file, i) => {
    pieces.push({ id: `w${backRank[i]}${i}`, type: backRank[i], color: 'white', square: `${file}1` });
    pieces.push({ id: `wP${i}`, type: 'P', color: 'white', square: `${file}2` });
    pieces.push({ id: `bP${i}`, type: 'P', color: 'black', square: `${file}7` });
    pieces.push({ id: `b${backRank[i]}${i}`, type: backRank[i], color: 'black', square: `${file}8` });
  });
  return pieces;
}

export const INITIAL_PIECES: Piece[] = initialPieces();

/** A short, recognizable opening (Ruy Lopez) — illustrative motion, not a live game. */
export const OPENING_SEQUENCE: { pieceId: string; to: string }[] = [
  { pieceId: 'wP4', to: 'e4' },
  { pieceId: 'bP4', to: 'e5' },
  { pieceId: 'wN6', to: 'f3' },
  { pieceId: 'bN1', to: 'c6' },
  { pieceId: 'wB5', to: 'b5' },
];
