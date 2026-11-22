export type Quote = {
  text: string
  who: string
  series: string
}

/**
 * One of these is picked per page load. Short enough to sit on a single quiet
 * line, credited so it reads as a nod rather than as a claim.
 */
export const quotes: Quote[] = [
  {
    text: 'I never go back on my word. That is my ninja way.',
    who: 'Naruto Uzumaki',
    series: 'Naruto',
  },
  {
    text: 'Those who abandon their friends are worse than scum.',
    who: 'Kakashi Hatake',
    series: 'Naruto',
  },
  {
    text: 'Hard work is worthless for those who do not believe in themselves.',
    who: 'Naruto Uzumaki',
    series: 'Naruto',
  },
  {
    text: 'If you do not take risks, you cannot create a future.',
    who: 'Monkey D. Luffy',
    series: 'One Piece',
  },
  {
    text: 'No matter how deep the night, it always turns to day eventually.',
    who: 'Brook',
    series: 'One Piece',
  },
  {
    text: 'A man dies when he is forgotten.',
    who: 'Dr. Hiriluk',
    series: 'One Piece',
  },
  {
    text: 'A lesson without pain is meaningless.',
    who: 'Edward Elric',
    series: 'Fullmetal Alchemist',
  },
  {
    text: 'Whatever happens, happens.',
    who: 'Spike Spiegel',
    series: 'Cowboy Bebop',
  },
  {
    text: 'You should enjoy the little detours to the fullest.',
    who: 'Ging Freecss',
    series: 'Hunter x Hunter',
  },
  {
    text: 'Humans are so interesting.',
    who: 'Ryuk',
    series: 'Death Note',
  },
]
