import { store } from "../../redux/store";

import { connect } from "@brunomon/helpers/connect";

import { ADD, ATRAS, BUSCAR, EDIT, NEXT } from "../../../assets/icons/svgs";
import { gridLayout } from "../css/gridLayout";
import { input } from "../css/input";
import { button } from "../css/button";
import { LitElement, html, css } from "lit-element";
import { goTo } from "../../redux/routing/actions";
import { busquedaComponent } from "../componentes/busqueda";
import { get as getNomencla } from "../../redux/nomencladorActivo/actions";
import { ordenar } from "../../redux/ui/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const BUSQUEDA = "ui.busqueda.texto";
const NOMENCLADOR = "NomencladorActivo.timeStamp";
const ORDENAR = "ui.ordenar.timeStamp";

export class nomencladorActivo extends connect(store, MEDIA_CHANGE, SCREEN, NOMENCLADOR, BUSQUEDA, ORDENAR)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.items = [];
        this.itemsFiltrados = [];
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${button}
            .body {
                display: grid;
                padding: 1rem;
            }
            .contenedor {
                background-color: var(--color-crudo);
            }
            .columnas {
                grid-template-columns: 4vw 57vw 10vw 21vw;
                padding: 0.3rem !important;
                border-bottom: 1px solid var(--color-gris-medio-claro);
            }
            .cabecera {
                background-color: var(--color-blanco);
                color: var(--color-azul-oscuro);
                font-size: 0.75rem;
                font-weight: bold;
                border-bottom: 1px solid var(--color-gris-claro);
            }
            .nomencla {
                background-color: var(--color-blanco);
                color: var(--color-azul-oscuro);
                font-size: 1rem;
                font-family: "Nunito", sans-serif;
                overflow-y: auto;
                height: 70vh;
            }
            .fila {
                display: grid;
                grid-template-columns: 4vw 57vw 10vw 21vw;
                padding: 0.3rem !important;
            }
        `;
    }

    render() {
        return html`
            <div class="body">
                <div class="grid row contenedor">
                    <busqueda-component></busqueda-component>
                    <div class="cabecera grid columnas">
                        <div class="ordena" @click=${this.ordenar} .order=${"Codigo"}>Código</div>
                        <div class="ordena" @click=${this.ordenar} .order=${"Descripcion"}>Descripción</div>
                        <div class="ordena" @click=${this.ordenar} .order=${"NivelAutorizacion"}>Nivel de autorización</div>
                        <div class="ordena" @click=${this.ordenar} .order=${"Nomenclador"}>Nomenclador</div>
                    </div>
                    <div class="nomencla inner-grid start">
                        ${this.itemsFiltrados.map((item) => {
                            return html` <div class="inner-grid columnas">
                                <div .item=${item}>${item.Codigo}</div>
                                <div .item=${item}>${item.Descripcion}</div>
                                <div .item=${item}>${item.NivelAutorizacion}</div>
                                <div .item=${item}>${item.Nomenclador}</div>
                            </div>`;
                        })}
                    </div>
                </div>
            </div>
        `;
    }

    /*<button class="add" btn2 @click=${this.altaDocumento}>${ADD}</button>*/

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            const haveBodyArea = state.screen.layouts[this.mediaSize].areas.find((a) => a == this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-nomencladorActivo-main-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                //si tiene body... y es la que estoy invocando
                this.hidden = false;
            }
            this.update();
        }

        if (name == NOMENCLADOR) {
            this.items = state.NomencladorActivo.entities;
            this.itemsFiltrados = state.NomencladorActivo.entities;
            this.update(); // corre de nuevo el render
        }

        if (name == BUSQUEDA) {
            if (state.screen.name == "main") {
                if (state.ui.busqueda.texto != "") {
                    this.itemsFiltrados = this.items.filter((item) => {
                        const text = item.Descripcion.toUpperCase() + item.Codigo + item.NivelAutorizacion.toUpperCase() + item.Nomenclador.toUpperCase();
                        return text.includes(state.ui.busqueda.texto.toUpperCase());
                    });
                } else {
                    this.itemsFiltrados = this.items;
                }
                let orden = state.ui.ordenar.order;
                this.itemsFiltrados = this.itemsFiltrados.sort((a, b) => {
                    if (a[orden] > b[orden]) return 1;
                    if (a[orden] < b[orden]) return -1;
                    return 0;
                });
                this.update();
            }
        }
        if (name == ORDENAR) {
            let orden = state.ui.ordenar.order;
            this.itemsFiltrados = this.itemsFiltrados.sort((a, b) => {
                if (a[orden] > b[orden]) return 1;
                if (a[orden] < b[orden]) return -1;
                return 0;
            });
            this.update();
        }
    }

    ordenar(e) {
        store.dispatch(ordenar(e.currentTarget.order));
    }
}

window.customElements.define("nomenclador-activo", nomencladorActivo);
