import React, { useEffect } from 'react';

const Toast = ({ message, type = 'default', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`} onClick={onClose}>
      {message}
    </div>
  );
};

export default Toast;