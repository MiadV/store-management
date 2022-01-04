import React, {
    useState,
    createContext,
    useMemo,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import { ShopType } from "../types";

type selectedStoreContextType = {
    selectedStore: ShopType | null;
    setSelectedStore: Dispatch<SetStateAction<ShopType | null>>;
};

const selectedStoreContext = createContext<selectedStoreContextType>({
    selectedStore: null,
    setSelectedStore: () => {},
});

export function useSelectedStore() {
    return useContext(selectedStoreContext);
}

export const SelectedStoreProvider: React.FC<any> = ({ children }) => {
    const [selectedStore, setSelectedStore] = useState<ShopType | null>(null);

    const value = useMemo(
        () => ({ selectedStore, setSelectedStore }),
        [selectedStore]
    );

    return (
        <selectedStoreContext.Provider value={value}>
            {children}
        </selectedStoreContext.Provider>
    );
};
