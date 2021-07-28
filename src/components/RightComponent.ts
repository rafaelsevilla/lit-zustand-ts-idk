import { customElement, html, LitElement, state, TemplateResult } from "lit-element";
import { store } from "../zustand/store";

@customElement('right-component')
export class RightComponent extends LitElement {

  @state()
  count?: number;

  @state()
  text?: string;

  stateSubscription: Function | null = null;

  firstUpdated(): void {
    // initialize from state
    this.count = store.getState().data.count;
    this.text = store.getState().data.text;
    // subscribe to updates
    this.stateSubscription = store.subscribe((data: any) => {
      console.log('RightComponent subscription')
      // multiple values can be subscribed to in a single call
      this.count = data.count;
      this.text = data.text;
    }, state => state.data);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // not sure if un-subscribing is necessary
    this.stateSubscription!();
  }

  render(): TemplateResult {
    console.log('RightComponent rendered')
    return html`
      RightComponent - Count: ${this.count}, Text: ${this.text}
    `;
  }

}