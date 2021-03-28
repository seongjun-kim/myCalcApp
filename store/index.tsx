import React, { createContext } from 'react';
import ResultStore from './resultStore';

export const ResultContext = createContext();

const StoreProvider = ({ children }: any) => {
	return <ResultContext.Provider value={ResultStore}>{children}</ResultContext.Provider>;
};

export default StoreProvider;
