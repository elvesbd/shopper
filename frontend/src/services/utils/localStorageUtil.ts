export const saveToLocalStorage = (key: string, value: string) => {
	localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};
