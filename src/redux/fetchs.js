/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApi = SERVICE_LOGIN_URL + "/api";

let webApiNomencladorActivo = SERVICE_URL; //url del dominio

const nomencladorActivoOdataFactory = ODataFetchFactory({
    //fetch del dominio
    fetch: fetch,
    domain: webApiNomencladorActivo,
});

//export const sectoresFetch = ODataEntity(documentacionOdataFactory, "Sectores"); //fetch de las entidades

export const loginFetch = fetchFactory(webApi, "LoginOS");
export const nomencaldorActivoFetch = ODataEntity(nomencladorActivoOdataFactory, "vNomencladorActivo");
