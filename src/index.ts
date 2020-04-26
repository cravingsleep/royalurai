import { simulate } from './fights/simulate';
import RandomStrategy from './strategies/random';
import RerollerStrategy from './strategies/reroller';

console.log(simulate(
    RandomStrategy,
    RandomStrategy,
    10000
));
