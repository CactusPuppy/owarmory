import type { Action } from "svelte/action";

export const closeable: Action<Node, { onclose?: () => void }> = (
  node,
  { onclose = () => null } = {},
) => {
  function click(event: MouseEvent): void {
    if (event.target instanceof Node && node.contains(event.target)) return;

    onclose();
  }

  function keydown(event: KeyboardEvent): void {
    if (event.code !== "Escape") return;

    onclose();
  }

  window.addEventListener("click", click);
  window.addEventListener("keydown", keydown);

  return {
    destroy() {
      window.removeEventListener("click", click);
      window.removeEventListener("keydown", keydown);
    },
  };
};
