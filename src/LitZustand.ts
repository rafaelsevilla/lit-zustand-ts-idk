import { LitElement, html, css } from 'lit-element';
import "./components/LeftComponent";
import "./components/RightComponent";
import "./components/Controls";

export class LitZustand extends LitElement {

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-zustand-ts-idk-background-color);
    }

    .thing {
      display: flex;
      width: 100%;
    }

    .thing > * {
      margin: 10px 40px;
      width: 50%;
    }
  `;

  render() {
    return html`
      <main>
        <div class="thing">
          <left-component></left-component>
          <right-component></right-component>
        </div>
        <br>
        <controls-component></controls-component>
      </main>
    `;
  }
}
