import { customElement, html, LitElement, state, TemplateResult } from "lit-element";
import { store } from "../zustand/store";

@customElement('left-component')
export class LeftComponent extends LitElement {

  @state()
  count?: number;

  stateSubscription: Function | null = null;

  firstUpdated(): void {
    // initialize from state
    this.count = store.getState().data.count;
    // subscribe to updates
    this.stateSubscription = store.subscribe((data: any) => {
      console.log('LeftComponent subscription')
      this.count = data.count;
    }, state => state.data);
    // this selector can be as specific as necessary
    // more generic selectors (like this) can be used, however they trigger the subscription function to run,
    // however if no @state() or @property() variables change, it won't trigger a re-render of the component
    // notice how updates to state.text do not put out a "LeftComponent rendered", but still put out a "LeftComponent subscription"
    // in this case, the proper subscription would be:
    // store.subscribe((data: number) => this.count = data, state => state.data.count);
    // however this necessitates additional subscription function declarations and un-registers on disconnectedCallback()
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // not sure if un-subscribing is necessary
    this.stateSubscription!();
  }

  render(): TemplateResult {
    console.log('LeftComponent rendered')
    return html`
      LeftComponent - Count: ${this.count}
    `;
  }

}