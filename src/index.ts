import { simulate } from './fights/simulate';
import CreatorStrategy from './strategies/creator';
import AggressiveStrategy from './strategies/aggressive';

console.log(simulate(
    CreatorStrategy,
    AggressiveStrategy,
    10000
));
