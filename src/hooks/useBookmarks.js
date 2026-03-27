import { useState, useCallback } from 'react';

const KEY = 'erab_bookmarks';

function loadBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(loadBookmarks);

  const save = useCallback((item) => {
    setBookmarks(prev => {
      // Avoid duplicates by text
      const next = [item, ...prev.filter(b => b.text !== item.text)].slice(0, 100);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((id) => {
    setBookmarks(prev => {
      const next = prev.filter(b => b.id !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(KEY);
    setBookmarks([]);
  }, []);

  return { bookmarks, save, remove, clear };
}
