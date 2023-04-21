import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

// the state can be defined like this and used later on create<StateDef> so we get nice typings everywhere else
export interface StateDef {
  data: {
    count: number;
    text: string;
  },
  set: (fn: (state: StateDef) => any) => void
}

const store = createStore<StateDef>()(
  devtools(
    (set) => ({
      data: {
        count: 0,
        text: ""
      },
      // @ts-ignore
      set: (fn: () => any) => set(produce(fn))
    })
  )
);

export { store };

// // store setup, here the store is passed through the zustand devtools (so the redux chrome devtools plugin shows the state and changes)
// export const store = createStore(devtools((set, get) => ({
//   // the default state - i think new class instances don't work here
//   data: {
//     count: 0,
//     text: ""
//   },
//   // the immer-produced setter function, so mutable updates actually work
//   set: (fn: any) => set(produce(fn))
// })));
