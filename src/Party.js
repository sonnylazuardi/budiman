import { useState, onCleanup } from "seniman";
import { proxy, subscribe } from "valtio";

const state = proxy({
  counter: 0,
});

export default function Party() {
  let [getCount, setCount] = useState(state.counter);
  let [getLocalCount, setLocalCount] = useState(0);
  let onAdd = () => state.counter++;
  let onMinus = () => state.counter--;

  let onAddLocal = () => setLocalCount(getLocalCount() + 1);
  let onMinusLocal = () => setLocalCount(getLocalCount() - 1);

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
      <div class="text-4xl font-semibold text-black">🎈 @senimanjs + Bun</div>
      <div class="mb-4 text-base text-black">Budiman, Hello World!</div>

      <div class="flex flex-col w-96 mb-4 rounded-md border border-red-600 p-4">
        <div class="mb-2">Server Counter: {getCount()}</div>
        <div class="flex flex-row justify-between">
          <button class="p-2 rounded-lg bg-black text-white" onClick={onAdd}>
            Increment
          </button>
          <button class="p-2 rounded-lg bg-black text-white" onClick={onMinus}>
            Decrement
          </button>
        </div>
      </div>

      <div class="flex flex-col w-96 mb-4 rounded-md border border-blue-600 p-4">
        <div class="mb-2">Client Counter: {getLocalCount()}</div>
        <div class="flex flex-row justify-between">
          <button
            class="p-2 rounded-lg bg-black text-white"
            onClick={onAddLocal}
          >
            Increment
          </button>
          <button
            class="p-2 rounded-lg bg-black text-white"
            onClick={onMinusLocal}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}
