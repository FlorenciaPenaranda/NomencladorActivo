/** @format */

import { html, LitElement, css } from "lit-element";
import { connect } from "@brunomon/helpers";
import { store } from "../redux/store";
import { layoutsCSS } from "../views/ui/layouts";
import { getLayout } from "../redux/screens/screenLayouts";
import { pantallaWarning } from "../views/bodies/warning";
import { menuPrincipal } from "../views/headers/menu";
import { nomencladorActivo } from "./bodies/NomencladorActivo";
import { alertaErrores } from "./bodies/alert";
import { SpinnerLoading } from "./componentes/spinner";
import { pantallaCambioClave } from "../views/bodies/cambioClave";
import { pantallaMiembro } from "./bodies/miembro";
import { goTo } from "../redux/routing/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
    constructor() {
        super();
        window.onpopstate = (event) => {
            if (event.state) {
                store.dispatch(goTo(event.state.option, true));
            } else {
                window.history.back();
            }
        };
    }

    static get styles() {
        return css`
            :host {
                position: absolute;
                top: 0;
                display: grid;
                height: 100vh;
                width: 100vw;
                padding: 0;
                background-color: var(--color-gris-claro);
                overflow: hidden;
            }

            ${layoutsCSS}

            :host::-webkit-scrollbar {
                width: 0.5vw;
                cursor: pointer;
            }
            :host::-webkit-scrollbar([media-size="small"]) {
                display: none;
            }
            :host::-webkit-scrollbar-thumb {
                background: var(--primary-color);
                border-radius: 5px;
            }
        `;
    }

    render() {
        return html`
            <menu-principal id="menu" class="header"></menu-principal>
            <spinner-loading type="spinner3"></spinner-loading>
            <nomenclador-activo id="nomencla"></nomenclador-activo>
        `;
    }

    /*<alerta-errores></alerta-errores>
        <pantalla-warning id="warning"></pantalla-warning>
        <spinner-loading type="spinner3"></spinner-loading>
        <pantalla-cambioclave id="cambioclave"></pantalla-cambioclave>
        <pantalla-miembro id="miembro"></pantalla-miembro>*/

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE || name == SCREEN) {
            this.mediaSize = state.ui.media.size;
            this.orientation = state.ui.media.orientation;
            this.layout = getLayout(state).name;
            if (!window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
                if ("standalone" in window.navigator && window.navigator.standalone) {
                    this.style.height = document.documentElement.offsetHeight ? document.documentElement.offsetHeight : window.innerHeight + "px";
                } else {
                    if (state.ui.media.orientation == "portrait") {
                        this.style.height = window.innerHeight < window.innerWidth ? window.innerWidth : window.innerHeight + "px";
                    } else {
                        this.style.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight + "px";
                    }
                }
            }
        }
        this.update();
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            layout: {
                type: String,
                reflect: true,
            },
            orientation: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("view-manager", viewManager);
