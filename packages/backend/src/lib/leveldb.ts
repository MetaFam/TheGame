import levelup from 'levelup';
import leveldown from 'leveldown';

export const leveldb = levelup(leveldown('metagame.leveldb'));