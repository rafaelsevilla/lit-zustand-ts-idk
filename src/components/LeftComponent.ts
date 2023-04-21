import { customElement, html, LitElement, state, TemplateResult } from "lit-element";
import { store } from "../zustand/store";

@customElement('left-component')
export class LeftComponent extends LitElement {

  @state()
  private count?: number = store.getState().data.count;

  @state()
  private text?: string = store.getState().data.text;

  private storeSubscription?: Function;

  firstUpdated(): void {
    this.storeSubscription = store.subscribe(state => {
      this.count = state.data.count;
      this.text = state.data.text;
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.storeSubscription!();
  }

  render = () => html`LeftComponent - Count: ${this.count}, Text: ${this.text}`;

}