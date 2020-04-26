export interface GameTeam {
    /**
     * The amount of chits completed and through the board
     * for this team.
     */
    chitsCompleted: number;

    /**
     * The amount of chits still waiting to be placed on the board.
     */
    chitsAwaiting: number;

    /**
     * An array of positions where the chits are, i.e.
     * `[1, 4]` means there is a chit on the first place
     * in the garrison and the first place of the war channel.
     */
    chitPositions: number[];
}

interface Game {
    white: GameTeam;
    black: GameTeam;
}

export default Game;
