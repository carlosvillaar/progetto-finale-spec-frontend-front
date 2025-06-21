import { createContext, useState, type ReactNode } from "react";

type GlobalContextType = {
  deviceToCompare: number[];
  setDeviceToCompare: (id: number[]) => void;
  resetDeviceToCompare: VoidFunction;
  favourites: number[];
  setFavourites: (id: number) => void;
};

const defaultGlobalContext: GlobalContextType = {
  deviceToCompare: [],
  setDeviceToCompare: (_: number[]) => {},
  resetDeviceToCompare: () => {},
  favourites: [],
  setFavourites: (_: number) => {},
};

const GlobalContext = createContext<GlobalContextType>(defaultGlobalContext);

type GlobalProviderType = {
  children: ReactNode;
};

const GlobalProvider = ({ children }: GlobalProviderType) => {
  const [deviceToCompare, setDeviceToCompare] = useState<number[]>([]);
  const [favourites, setFaourites] = useState<number[]>([]);
  const setDevice = (id: number[]) => setDeviceToCompare([...id]);

  const handleFavourites = (id: number) => {
    if (favourites.includes(id)) {
      const nextFavourites = favourites.filter((el: number) => el !== id);
      setFaourites(nextFavourites);
    } else {
      setFaourites([...favourites, id]);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        deviceToCompare,
        setDeviceToCompare: setDevice,
        resetDeviceToCompare: () => setDeviceToCompare([]),
        favourites,
        setFavourites: handleFavourites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
