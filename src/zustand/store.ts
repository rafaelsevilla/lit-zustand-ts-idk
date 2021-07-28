import create from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

// the state can be defined like this and used later on create<StateDef> so we get nice typings everywhere else
export interface StateDef {
  data: {
    count: number;
    text: string;
  },
  set: Function;
}

// store setup, here the store is passed through the zustand devtools (so the redux chrome devtools plugin shows the state and changes)
export const store = create<StateDef>(devtools((set, get) => ({
  // the default state - i think new class instances don't work here
  data: {
    count: 0,
    text: ""
  },
  // the immer-produced setter function, so mutable updates actually work
  set: (fn: any) => set(produce(fn))
})));
