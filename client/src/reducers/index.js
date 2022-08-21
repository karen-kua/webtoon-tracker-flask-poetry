import { combineReducers } from "redux";

import { webtoonsReducer } from "./webtoons";

export const rootReducer = combineReducers({
    webtoons: webtoonsReducer
})