const { configureStore } = require("@reduxjs/toolkit");
import permissionSlice from "./permissions";
import apiDataSlice from "./apiData";
import productPricesSlice from "./productPrices";
import boxPricesSlice from "./boxPrices";
import informationSlice from "./information";
import globalMessage from "./globalMessage";
import logOutTime from "./logOutTime";

export const store = configureStore({
    reducer: {
        permissions: permissionSlice,
        apiData: apiDataSlice,
        productPrices: productPricesSlice,
        boxPrices: boxPricesSlice,
        information: informationSlice,
        logOutTime: logOutTime,
        globalMessage: globalMessage,
    },
    devTools: true
});
