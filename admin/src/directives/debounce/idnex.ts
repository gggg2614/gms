import { Directive, type DirectiveBinding } from "vue";

export const btnDebounce = {
  updated(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener("click", e => {
      el.classList.add("is-disabled");
      el.disabled = true;
      setTimeout(() => {
        el.disabled = false;
        el.classList.remove("is-disabled");
      }, 1000);
    });
  }
};