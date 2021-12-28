import { nomencaldorActivoFetch } from "../fetchs.js";
import { GET, GET_SUCCESS, GET_ERROR } from "./actions";
import { showSpinner, hideSpinner, showError } from "../api/actions";
import { apiRequest, apiUpdate, apiDelete, apiAdd, apiAction } from "../api/actions";
import { goTo } from "../routing/actions.js";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET) {
            //dispatch(apiRequest( , action.options, GET_SUCCESS, GET_ERROR));
            dispatch(showSpinner());
            fetch(SERVICE_URL + "/odata/vNomencladorActivo", {
                method: "GET",
                headers: {
                    "Content-Type": "aplication/json",
                    Authorization: "Basic QWRtaW46QWRtaW4=",
                },
            })
                .then((res) => res.json())
                .then((response) => {
                    dispatch(hideSpinner());
                    dispatch({
                        type: GET_SUCCESS,
                        payload: {
                            receive: response.value,
                        },
                    });
                })
                .catch((error) => {
                    dispatch(hideSpinner());
                    console.error(error);
                });
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SUCCESS) {
            //dispatch(goTo("documentacionDocumentacion"));
            //dispatch(add())
            //dispatch(updateDoc(2, "Descripcion", "Normativa de Afiliaciones"));
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ERROR) {
            dispatch(showError(action.payload.message));
        }
    };

export const middleware = [get, processGet, processError];
