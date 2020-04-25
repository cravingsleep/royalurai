import { simulate } from './fights/simulate';
import CreatorStrategy from './strategies/creator';
import RandomStrategy from './strategies/random';

console.log(simulate(
    CreatorStrategy,
    RandomStrategy,
    10000
));
