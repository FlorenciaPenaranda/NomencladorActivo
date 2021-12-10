/** @format */

import { reducer as uiReducer } from "./ui/reducer";
import { reducer as screenReducer } from "./screens/reducer";
import { reducer as routingReducer } from "./routing/reducer";
import { reducer as apiReducer } from "./api/reducer";

import { reducer as autorizacionReducer } from "./autorizacion/reducer";
import { reducer as NomencladorActivoReducer } from "./nomencladorActivo/reducer";

export const rootReducer = (state = {}, action) => {
    return {
        api: apiReducer(state.api, action),
        ui: uiReducer(state.ui, action),
        screen: screenReducer(state.screen, action),
        routing: routingReducer(state.routing, action),
        autorizacion: autorizacionReducer(state.autorizacion, action),
        NomencladorActivo: NomencladorActivoReducer(state.NomencladorActivo, action),
    };
};
