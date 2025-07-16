import { useState, useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../../constants/const";

// Custom event to notify when there is a change
const FAVORITE_CHANGED_EVENT = "favorite:changed";

export const useFavorite = (itemID?: string) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the item exists in localStorage
  useEffect(() => {
    if (!itemID) return;
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    setIsFavorite(stored.includes(itemID));
  }, [itemID]);

  const toggleFavorite = () => {
    const stored: string[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );

    let updated: string[];

    if (stored.includes(itemID!)) {
      updated = stored.filter((id) => id !== itemID);
    } else {
      updated = [...stored, itemID!];
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    setIsFavorite(updated.includes(itemID!));

    window.dispatchEvent(
      new CustomEvent(FAVORITE_CHANGED_EVENT, {
        detail: { itemID, isFavorite: updated.includes(itemID!) },
      })
    );
  };

  return { isFavorite, toggleFavorite };
};

// Separate hook to listen for changes in the favorites list
export const useFavoriteChangeListener = (
  callback: (event: CustomEvent) => void
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      callback(e as CustomEvent);
    };
    window.addEventListener(FAVORITE_CHANGED_EVENT, listener);
    return () => window.removeEventListener(FAVORITE_CHANGED_EVENT, listener);
  }, [callback]);
};
