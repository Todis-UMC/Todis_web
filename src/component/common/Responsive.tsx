import React, { ReactNode, useEffect, useState } from 'react';

interface MobileProps {
  children: ReactNode;
}
interface PCProps {
  children: ReactNode;
}

export const Mobile = ({ children }: MobileProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{isMobile && children}</>;
};

export const PC = ({ children }: PCProps) => {
  const [isPc, setIsPc] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPc(window.innerWidth >= 900);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{isPc && children}</>;
};
