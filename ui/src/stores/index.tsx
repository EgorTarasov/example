import {rootStore} from "@/stores/RootStore.ts";
import {createContext} from "react";

export const rootStoreContext = createContext({
    rootStore: rootStore
})