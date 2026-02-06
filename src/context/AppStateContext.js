import React, { createContext, useContext, useReducer, useCallback } from 'react';
import windowPositionManager from '../utils/windowPositionManager';

// Action Types
export const ACTIONS = {
  OPEN_WINDOW: 'OPEN_WINDOW',
  CLOSE_WINDOW: 'CLOSE_WINDOW',
  MINIMIZE_WINDOW: 'MINIMIZE_WINDOW',
  MAXIMIZE_WINDOW: 'MAXIMIZE_WINDOW',
  FOCUS_WINDOW: 'FOCUS_WINDOW',
  UPDATE_POSITIONS: 'UPDATE_POSITIONS',
  SET_SCREEN_SIZE: 'SET_SCREEN_SIZE',
  TOGGLE_START_MENU: 'TOGGLE_START_MENU',
  TRIGGER_SHUTDOWN: 'TRIGGER_SHUTDOWN',
  COMPLETE_SHUTDOWN: 'COMPLETE_SHUTDOWN'
};

// Initial State
const initialState = {
  windows: {},
  activeWindowId: null,
  nextZIndex: 100,
  startMenuOpen: true,
  showShutdown: false,
  screenSize: {
    width: window.innerWidth,
    height: window.innerHeight
  }
};

// Reducer
function appStateReducer(state, action) {
  switch (action.type) {
    case ACTIONS.OPEN_WINDOW: {
      const { id, window: windowData } = action.payload;
      const isAlreadyOpen = state.windows[id]?.isOpen;

      if (isAlreadyOpen) {
        // Restore and focus
        return {
          ...state,
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              isMinimized: false,
              zIndex: state.nextZIndex
            }
          },
          activeWindowId: id,
          nextZIndex: state.nextZIndex + 1
        };
      }

      // Open new window
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: {
            ...windowData,
            isOpen: true,
            isMinimized: false,
            zIndex: state.nextZIndex
          }
        },
        activeWindowId: id,
        nextZIndex: state.nextZIndex + 1
      };
    }

    case ACTIONS.CLOSE_WINDOW: {
      const { id } = action.payload;
      const { [id]: removed, ...remainingWindows } = state.windows;
      
      return {
        ...state,
        windows: remainingWindows,
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
      };
    }

    case ACTIONS.MINIMIZE_WINDOW: {
      const { id } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMinimized: true
          }
        },
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
      };
    }

    case ACTIONS.MAXIMIZE_WINDOW: {
      const { id } = action.payload;
      
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMaximized: !state.windows[id]?.isMaximized
          }
        }
      };
    }

    case ACTIONS.FOCUS_WINDOW: {
      const { id } = action.payload;
      
      if (!state.windows[id]) return state;

      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            zIndex: state.nextZIndex,
            isMinimized: false
          }
        },
        activeWindowId: id,
        nextZIndex: state.nextZIndex + 1
      };
    }

    case ACTIONS.UPDATE_POSITIONS: {
      const { screenWidth, screenHeight } = action.payload;
      const updatedWindows = {};

      Object.entries(state.windows).forEach(([id, window]) => {
        if (!window.isOpen || window.isMaximized) {
          updatedWindows[id] = window;
          return;
        }

        // Get base window type from id (e.g., 'about', 'projects', 'project-pokestop' -> 'projectDetail')
        const baseType = id.startsWith('project-') ? 'projectDetail' : id;
        
        let newPosition;
        if (id.startsWith('project-')) {
          // Calculate cascaded position for project detail windows
          const projectWindows = Object.entries(state.windows)
            .filter(([wId]) => wId.startsWith('project-'))
            .map(([wId]) => wId);
          const index = projectWindows.indexOf(id);
          
          const basePos = windowPositionManager.getDefaultPosition(
            'projectDetail',
            screenWidth,
            screenHeight
          );
          
          newPosition = windowPositionManager.getCascadedPosition(
            basePos.x,
            basePos.y,
            index,
            screenWidth,
            screenHeight
          );
        } else {
          newPosition = windowPositionManager.getDefaultPosition(
            baseType,
            screenWidth,
            screenHeight
          );
        }

        updatedWindows[id] = {
          ...window,
          position: newPosition
        };
      });

      return {
        ...state,
        windows: updatedWindows
      };
    }

    case ACTIONS.SET_SCREEN_SIZE: {
      const { width, height } = action.payload;
      
      return {
        ...state,
        screenSize: { width, height }
      };
    }

    case ACTIONS.TOGGLE_START_MENU: {
      return {
        ...state,
        startMenuOpen: !state.startMenuOpen
      };
    }

    case ACTIONS.TRIGGER_SHUTDOWN: {
      return {
        ...state,
        showShutdown: true
      };
    }

    case ACTIONS.COMPLETE_SHUTDOWN: {
      return {
        ...state,
        showShutdown: false
      };
    }

    default:
      return state;
  }
}

// Context
const AppStateContext = createContext();

// Provider Component
export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  // Action creators
  const actions = {
    openWindow: useCallback((id, windowData) => {
      dispatch({
        type: ACTIONS.OPEN_WINDOW,
        payload: { id, window: windowData }
      });
    }, []),

    closeWindow: useCallback((id) => {
      dispatch({
        type: ACTIONS.CLOSE_WINDOW,
        payload: { id }
      });
    }, []),

    minimizeWindow: useCallback((id) => {
      dispatch({
        type: ACTIONS.MINIMIZE_WINDOW,
        payload: { id }
      });
    }, []),

    maximizeWindow: useCallback((id) => {
      dispatch({
        type: ACTIONS.MAXIMIZE_WINDOW,
        payload: { id }
      });
    }, []),

    focusWindow: useCallback((id) => {
      dispatch({
        type: ACTIONS.FOCUS_WINDOW,
        payload: { id }
      });
    }, []),

    updatePositions: useCallback((screenWidth, screenHeight) => {
      dispatch({
        type: ACTIONS.UPDATE_POSITIONS,
        payload: { screenWidth, screenHeight }
      });
    }, []),

    setScreenSize: useCallback((width, height) => {
      dispatch({
        type: ACTIONS.SET_SCREEN_SIZE,
        payload: { width, height }
      });
    }, []),

    toggleStartMenu: useCallback(() => {
      dispatch({ type: ACTIONS.TOGGLE_START_MENU });
    }, []),

    triggerShutdown: useCallback(() => {
      dispatch({ type: ACTIONS.TRIGGER_SHUTDOWN });
    }, []),

    completeShutdown: useCallback(() => {
      dispatch({ type: ACTIONS.COMPLETE_SHUTDOWN });
    }, [])
  };

  const value = {
    state,
    ...actions
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

// Hook to use app state
export function useAppState() {
  const context = useContext(AppStateContext);
  
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  
  return context;
}

export default AppStateContext;
