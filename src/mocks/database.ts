import {type RequestModel} from "../models/requestModel"

const LOCAL_STORAGE_KEY = "sdo_challenge_database_mock";

export function saveRequests(items: RequestModel[]): void{
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error("Error saving Request Data: ", error);
    }
}

let cache: RequestModel[] | null = null;

export function loadRequests(): RequestModel[] {
    try {
        const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (rawData) {
            cache = JSON.parse(rawData) as RequestModel[];
            return cache;
        }
    } catch (error) {
        console.error("Nao foi possivel recuperar as requisicoes: ", error);
    }

    return cache = [];
}