import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalContainerProps {
  children: ReactNode;
}
function ModalContainer({ children }: ModalContainerProps) {
  return createPortal(<>{children}</>, document.getElementById('modal')!);
}

export default ModalContainer;
