import { simulate } from './fights/simulate';
import RandomStrategy from './strategies/random';
import RerollerStrategy from './strategies/reroller';
import AggressiveStrategy from './strategies/aggressive';

console.log(simulate(
    RerollerStrategy,
    AggressiveStrategy,
    10000
));
