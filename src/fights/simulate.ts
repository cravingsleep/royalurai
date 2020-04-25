import { pit } from './pit';
import Player from '../strategies/player';
import { range } from '../util';
import Team from '../types/team';

interface Winnings {
    player1Wins: number;
    player2Wins: number;
}

export function simulate<T extends Player>(Player1: new (team: Team) => T, Player2: new (team: Team) => T, iterations: number): Winnings {
    return range(iterations).reduce(acc => {
        const isPlayer1White = Math.random() > 0.5;

        const winningSide = isPlayer1White ? pit(Player1, Player2) : pit(Player2, Player1);

        if (winningSide === Team.WHITE) {
            return Object.assign(
                {},
                acc,
                isPlayer1White ? {
                    player1Wins: acc.player1Wins + 1
                } : {
                        player2Wins: acc.player2Wins + 1
                    }
            );
        }

        return Object.assign(
            {},
            acc,
            isPlayer1White ? {
                player2Wins: acc.player2Wins + 1
            } : {
                    player1Wins: acc.player1Wins + 1
                }
        );
    }, {
        player1Wins: 0,
        player2Wins: 0
    });
}
