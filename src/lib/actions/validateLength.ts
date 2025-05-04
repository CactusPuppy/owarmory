import type { Action } from "svelte/action";

export const validateLength: Action<
  Node,
  {
    min?: number;
    max?: number;
    onvalid?: () => void;
    oninvalid?: () => void;
    oninput?: (isValid: boolean) => void;
  }
> = (
  node,
  { min = 0, max = 10, onvalid = () => null, oninvalid = () => null, oninput = () => null } = {},
) => {
  let isValid = true;
  let errorElement: HTMLElement | null = null;

  function validate(): void {
    if (!["INPUT", "TEXTAREA"].includes(node.nodeName)) {
      console.error("Can only be used with input or textarea");
      return;
    }

    // @ts-expect-error We know it's a correct input element
    const element: HTMLInputElement = node;
    const {
      value: { length },
    } = element;

    isValid = length >= min && length <= max;

    if (isValid) {
      onvalid();
      removeErrorElement();
    } else {
      oninvalid();
      createOrUpdateErrorElement(element, length);
    }

    element.classList.toggle("form-outline-error", !isValid);

    oninput(isValid);
  }

  function createOrUpdateErrorElement(element: HTMLInputElement, currentLength: number): void {
    const label = `Min: ${min} - Max: ${max} - Current: ${currentLength}`;

    if (errorElement) {
      errorElement.innerText = label;
      return;
    }

    errorElement = document.createElement("div");
    errorElement.classList.add("form-text-error");
    errorElement.innerText = label;

    element.insertAdjacentElement("afterend", errorElement);
  }

  function removeErrorElement() {
    if (!errorElement) return;

    errorElement!.remove();
    errorElement = null;
  }

  node.addEventListener("input", validate);

  return {
    destroy() {
      node.removeEventListener("input", validate);
    },
  };
};
