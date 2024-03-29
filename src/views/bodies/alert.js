import { html, LitElement, css } from "lit-element";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const ERROR_MESSAGES = "ui.error.messages";

export class alertaErrores extends connect(store, ERROR_MESSAGES)(LitElement) {
    constructor() {
        super();
    }
    render() {
        return html``;
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.update();
        }

        if (name == ERROR_MESSAGES) {
            alert(
                "ERROR :\n\n" +
                    state.ui.error.messages.reduce((text, msg) => {
                        return text + "• " + msg.campo + ": " + msg.mensaje + "\n";
                    }, "")
            );
        }
    }
}
window.customElements.define("alerta-errores", alertaErrores);
