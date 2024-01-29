import { useState, onCleanup } from "seniman";
import { proxy, subscribe } from "valtio";

const state = proxy({
  counter: 0,
});

export default function Counter() {
  let [getCount, setCount] = useState(state.counter);
  let onAdd = () => state.counter++;
  let onMinus = () => state.counter--;

  const unsubscribe = subscribe(state, () => {
    setCount(state.counter);
  });

  onCleanup(() => {
    unsubscribe();
  });

  return (
    <div
      class="w-full flex flex-col justify-center items-center"
      style={{ height: "100vh" }}
    >
      <div class="text-lg font-semibold">Real Time Counter</div>
      <div class="mb-4 text-xs text-neutral-400">
        Built with Budiman - Bun & Seniman
      </div>
      <div class="mb-4 p-8 text-3xl font-semibold text-white bg-black rounded-lg">
        {getCount()}
      </div>
      <div class="flex flex-row space-x-2">
        <button class="p-2 rounded-lg bg-black text-white" onClick={onMinus}>
          Minus -
        </button>
        <button class="p-2 rounded-lg bg-black text-white" onClick={onAdd}>
          Add +
        </button>
      </div>
    </div>
  );
}
