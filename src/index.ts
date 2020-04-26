import fs = require('fs');
import { pit } from './fights/pit';
import FurthestStrategy from './strategies/furthest';
import AggressiveStrategy from './strategies/aggressive';
import { simulate } from './fights/simulate';
import RandomStrategy from './strategies/random';
import CreatorStrategy from './strategies/creator';
import RerollerStrategy from './strategies/reroller';

// big simulation
console.log(simulate(
    AggressiveStrategy,
    RerollerStrategy,
    10000
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
