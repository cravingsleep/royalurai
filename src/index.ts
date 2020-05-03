import { simulate } from './fights/simulate';
import RandomStrategy from './strategies/random';

// big simulation
console.log(simulate(
    RandomStrategy,
    RandomStrategy,
    1000
));

// const game = pit(
//     AggressiveStrategy,
//     FurthestStrategy,
//     true
// );

// if (!fs.existsSync('logs')) {
//     fs.mkdirSync('logs');
// }
// fs.writeFileSync('./logs/game.json', JSON.stringify(game, null, 2));
