import { useEffect, useState } from 'react';

export default function useMedia(queries, values, defaultValue) {
  const match = () => values[queries.findIndex(q => matchMedia(q).matches)] || defaultValue;
  const [value, set] = useState(match);
  useEffect(() => {
    const handler = () => set(match);
    if (typeof window !== `undefined`) {
      window.addEventListener('resize', handler);
    }

    return () => {
      if (typeof window !== `undefined`) {
        window.removeEventListener(handler);
      }
    };
  }, []);
  return value;
}
