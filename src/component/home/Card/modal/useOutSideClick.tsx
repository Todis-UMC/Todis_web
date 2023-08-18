import { useEffect, RefObject } from 'react';

function useOutSideClick(ref: RefObject<HTMLElement>, callback: () => void) {
  // 모달창 외부클릭 닫기 - 커스텀 훅
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback?.();
      }
    };
    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
}

export default useOutSideClick;