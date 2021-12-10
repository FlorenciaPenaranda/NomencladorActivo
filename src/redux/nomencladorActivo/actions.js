export const GET = "[NomencladorActivo] get";
export const GET_SUCCESS = "[NomencladorActivo] get succes";
export const GET_ERROR = "[NomencladorActivo] get error";

export const get = (options) => ({
    type: GET,
    options: options,
});
