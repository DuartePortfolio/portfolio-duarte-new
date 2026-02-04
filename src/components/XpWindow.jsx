import React, { useState, useRef, useCallback, useEffect } from 'react';
import './XpWindow.css';

const XpWindow = ({ 
  title, 
  children, 
  onClose, 
  onMinimize,
  onFocus,
  isActive,
  initialPosition = { x: 100, y: 100 },
  zIndex = 1
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  }, [isDragging, dragOffset.x, dragOffset.y]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.closest('.xp-window-controls')) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
    if (onFocus) onFocus();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={windowRef}
      className={`xp-window ${isActive ? 'active' : ''}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: zIndex
      }}
      onClick={() => onFocus && onFocus()}
    >
      <div 
        className="xp-window-title-bar"
        onMouseDown={handleMouseDown}
      >
        <span className="xp-window-title">{title}</span>
        <div className="xp-window-controls">
          {onMinimize && (
            <button 
              className="xp-window-btn minimize"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
            >
              <span>_</span>
            </button>
          )}
          <button 
            className="xp-window-btn close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <span>×</span>
          </button>
        </div>
      </div>
      <div className="xp-window-content">
        {children}
      </div>
    </div>
  );
};

export default XpWindow;
