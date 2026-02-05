import React, { useState, useRef, useCallback, useEffect } from 'react';
import './XpWindow.css';

const XpWindow = ({ 
  title, 
  children, 
  onClose, 
  onMinimize,
  onMaximize,
  onFocus,
  isActive,
  isMaximized = false,
  initialPosition = { x: 100, y: 100 },
  zIndex = 1
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    // Constrain window position to keep title bar visible
    const newX = e.clientX - dragOffset.x;
    const newY = Math.max(0, e.clientY - dragOffset.y); // Prevent dragging above viewport
    
    setPosition({
      x: newX,
      y: newY
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
      className={`xp-window ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''}`}
      style={isMaximized ? {
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)', // Account for taskbar
        zIndex: zIndex
      } : { 
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
          {onMaximize && (
            <button 
              className="xp-window-btn maximize"
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
            >
              <span>{isMaximized ? '❐' : '□'}</span>
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
