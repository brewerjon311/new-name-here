/**
 * Copyright 2025 brewerjon311
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `new-name-here`
 * 
 * @demo index.html
 * @element new-name-here
 */
export class NewNameHere extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "new-name-here";
  }
// the edits made below were done to change it from title related functions to numberical/counter related functions.
  constructor() {
    super();
    this.count = 0;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/new-name-here.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }
// The properties above this were changed to be a number type in order to work as a counter.
  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      :host([count="10"]) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host([count="18"]) {
        color: var(--ddd-theme-default-wonderPurple);
      }
      :host([count="21"]) {
        color: var(--ddd-theme-default-landgrantBrown);
      }
      /* when the counter reaches 10, 18, or 21 it will change color to atherton violet */
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .counter{
        font-size: var(--new-name-here-label-font-size, var(--ddd-font-size-xxl));
      }
    `];
  }

  // The changes made to the below code occured because it was changing it from an object similar to our cards that were pictures, paragraphs, and headers; into a counter app.
  render() {
    return html`
<confetti-container id="confetti">
  <div class="wrapper">
    <div class="counter">${this.count}</div>
    <div class="buttons">
      <button @click="${() => this.decrease(-1)}">-1</button>
      <button @click="${() => this.increase(1)}">+1</button>
      <button @click="${() => this.triggerConfetti()}">Celebrate</button>
    </div>
  </div>
</confetti-container>`;
// the confetti wrapper was added in order for the confetti to work properly
  }
// the functions below exist to increase, decrease, and reset the counter when the respective buttons are clicked

  connectedCallback() {
    super.connectedCallback();
    // set defaults
    if (typeof this.min !== "number") this.min = -25;
    if (typeof this.max !== "number") this.max = 25;
    // set the min to -25 and max to 25
    this._clampCount();
  }

  // functions to tell if the counter is at min or max
  get isAtMin() {
    return typeof this.min === "number" && this.count <= this.min;
  }
// true or false if at min or max
  get isAtMax() {
    return typeof this.max === "number" && this.count >= this.max;
  }

  increase(delta = 1) {
    const next = Number(this.count) + delta;
    if (typeof this.max === "number" && next > this.max) {
      this.count = this.max;
      return;
    }
    this.count = next;
  }

  decrease(delta = -1) {
    const next = Number(this.count) + delta;
    if (typeof this.min === "number" && next < this.min) {
      this.count = this.min;
      return;
    }
    this.count = next;
  }
// the reset function below sets the counter back to 0
  reset() {
    this.count = 0;
    this._clampCount();
  }
// ensures the count is within the rights areas
  _clampCount() {
    if (typeof this.min === "number" && this.count < this.min) this.count = this.min;
    if (typeof this.max === "number" && this.count > this.max) this.count = this.max;
  }
  

  // confetti code below this
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('count')) {
      const old = changedProperties.get('count');
      const current = this.count;
      console.debug(this.tag, 'count changed', { old, current });
      if (current === 21 && old !== 21) {
        this.triggerConfetti?.();
      }
    }
  }

  triggerConfetti() {
    this.makeItRain();
  }
// this is a series of functions that allow for the confetti to appear when the counter hits 21
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js")
      .then(() => {
        setTimeout(() => {
          const confettiEl = (this.shadowRoot && this.shadowRoot.querySelector('#confetti')) || document.getElementById('confetti');
          if (confettiEl) {
            confettiEl.setAttribute('popped', '');
            console.debug(this.tag, 'confetti popped on', confettiEl);
          } else {
            console.warn(this.tag, 'confetti element not found to pop');
          }
        }, 0);
      })
      .catch((e) => console.error(this.tag, 'failed to import confetti module', e));
  }
}

globalThis.customElements.define(NewNameHere.tag, NewNameHere);