import { useState, useEffect } from "react";
import { LOCAL_STORAGE_HISTORY_KEY } from "../../constants/const";

const HISTORY_CHANGED_EVENT = "history:changed";

export const useHistory = (productId?: string) => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored: string[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY) || "[]"
    );
    setHistory(stored);
  }, []);

  const addToHistory = () => {
    if (!productId) return;

    const stored: string[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY) || "[]"
    );

    const updated = [...stored.filter((id) => id !== productId), productId];

    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
    setHistory(updated);

    window.dispatchEvent(
      new CustomEvent(HISTORY_CHANGED_EVENT, {
        detail: { productId, updated },
      })
    );
  };

  return { history, addToHistory };
};

export const useHistoryChangeListener = (
  callback: (event: CustomEvent) => void
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      callback(e as CustomEvent);
    };
    window.addEventListener(HISTORY_CHANGED_EVENT, listener);
    return () => window.removeEventListener(HISTORY_CHANGED_EVENT, listener);
  }, [callback]);
};
