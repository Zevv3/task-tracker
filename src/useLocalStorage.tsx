import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // checking if it exists
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            if (typeof initialValue === 'function') {
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            try {
              return JSON.parse(jsonValue, (key, value) => {
                if (key === 'date') {
                  return new Date(value);
                }
                return value;
              });
            } catch (error) {
              console.error("Error parsing JSON:", error);
              return initialValue;
            }
          }
        });

// update it when we find it
    useEffect(() => {
        // Stringify the value and handle date serialization
        localStorage.setItem(key, JSON.stringify(value, (_, value) => {
        if (value instanceof Date) {
            return value.toISOString(); // Convert Date to ISO string
        }
        return value;
        }));
    }, [value, key]);

    return [value, setValue] as [T, typeof setValue]
}