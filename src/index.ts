import { simulate } from './fights/simulate';
import RandomStrategy from './strategies/random';
import AggressiveStrategy from './strategies/aggressive';

console.log(simulate(
    AggressiveStrategy,
    RandomStrategy,
    10000
));
