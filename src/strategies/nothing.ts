import Player from './player';
import Move from '../types/move';

/**
 * The worst strategy imaginable. Just do nothing each time. Cannot win.
 */
class NothingStrategy extends Player {
    move(): Move {
        return 'nothing';
    }
}

export default NothingStrategy;
