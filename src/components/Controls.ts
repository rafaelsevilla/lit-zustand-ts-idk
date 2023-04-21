import { customElement, html, LitElement, TemplateResult } from "lit-element";
import { StateDef, store } from "../zustand/store";

@customElement('controls-component')
export class Controls extends LitElement {

  private changeBoth(): void {
    // this is the same as the two buttons below, but it's a single action
    store.getState().set(state => {
      state.data.count += 50;
      state.data.text = Math.random().toString(36).substring(7);
    });
  }

  render(): TemplateResult {
    console.log('Controls rendered')
    return html`
      Controls

      <!-- using store.getState().set() allows mutable changes (function produced by immer) - much easier than re-assigning the whole thing with store.setState() -->
      <!-- state changes don't need to be defined as actions, just define a function that has state as a parameter, modify any state values in it, and pass it onto store.getState().set() -->
      <button @click="${() => store.getState().set(state => {state.data.count += 50})}">Count +50</button>
      <button @click="${() => store.getState().set(state => {state.data.text = Math.random().toString(36).substring(7)})}">Random Text</button>
      <button @click="${this.changeBoth}">Change Both</button>
    `;
  }

}