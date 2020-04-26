/**
 * The place of the chit you want to move or place a new chit.
 */
type Move = number | 'new';

/**
 * The 4 possible rolls (0 is a possible roll but is not taken into account,
 * largely because no strategy can have any other move but 'skip' a go so it is
 * irrelevant to their understanding of the game).
 */
export type Roll = 1 | 2 | 3 | 4;

export default Move;
