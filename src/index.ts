import { simulate } from './fights/simulate';
import RandomStrategy from './strategies/random';
import AggressiveStrategy from './strategies/aggressive';
import CreatorStrategy from './strategies/creator';

console.log(simulate(
    CreatorStrategy,
    AggressiveStrategy,
    10000
));
