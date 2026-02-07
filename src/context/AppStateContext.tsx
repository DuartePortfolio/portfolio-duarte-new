import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import windowPositionManager from '../utils/windowPositionManager';

// Types
interface Position {
  x: number;
  y: number;
}

interface ScreenSize {
  width: number;
  height: number;
}

interface WindowData {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: Position;
  [key: string]: any;
}

interface WindowsMap {
  [id: string]: WindowData;
}

interface AppState {
  windows: WindowsMap;
  activeWindowId: string | null;
  nextZIndex: number;
  startMenuOpen: boolean;
  showShutdown: boolean;
  screenSize: ScreenSize;
}

interface OpenWindowPayload {
  id: string;
  window: Partial<WindowData>;
}

interface CloseWindowPayload {
  id: string;
}

interface MinimizeWindowPayload {
  id: string;
}

interface MaximizeWindowPayload {
  id: string;
}

interface FocusWindowPayload {
  id: string;
}

interface UpdatePositionsPayload {
  screenWidth: number;
  screenHeight: number;
}

interface SetScreenSizePayload {
  width: number;
  height: number;
}

type AppAction =
  | { type: 'OPEN_WINDOW'; payload: OpenWindowPayload }
  | { type: 'CLOSE_WINDOW'; payload: CloseWindowPayload }
  | { type: 'MINIMIZE_WINDOW'; payload: MinimizeWindowPayload }
  | { type: 'MAXIMIZE_WINDOW'; payload: MaximizeWindowPayload }
  | { type: 'FOCUS_WINDOW'; payload: FocusWindowPayload }
  | { type: 'UPDATE_POSITIONS'; payload: UpdatePositionsPayload }
  | { type: 'SET_SCREEN_SIZE'; payload: SetScreenSizePayload }
  | { type: 'TOGGLE_START_MENU' }
  | { type: 'TRIGGER_SHUTDOWN' }
  | { type: 'COMPLETE_SHUTDOWN' };

// Action Types
export const ACTIONS = {
  OPEN_WINDOW: 'OPEN_WINDOW' as const,
  CLOSE_WINDOW: 'CLOSE_WINDOW' as const,
  MINIMIZE_WINDOW: 'MINIMIZE_WINDOW' as const,
  MAXIMIZE_WINDOW: 'MAXIMIZE_WINDOW' as const,
  FOCUS_WINDOW: 'FOCUS_WINDOW' as const,
  UPDATE_POSITIONS: 'UPDATE_POSITIONS' as const,
  SET_SCREEN_SIZE: 'SET_SCREEN_SIZE' as const,
  TOGGLE_START_MENU: 'TOGGLE_START_MENU' as const,
  TRIGGER_SHUTDOWN: 'TRIGGER_SHUTDOWN' as const,
  COMPLETE_SHUTDOWN: 'COMPLETE_SHUTDOWN' as const
};

// Initial State
const initialState: AppState = {
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
function appStateReducer(state: AppState, action: AppAction): AppState {
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
            id,
            isOpen: true,
            isMinimized: false,
            zIndex: state.nextZIndex
          } as WindowData
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
      const updatedWindows: WindowsMap = {};

      Object.entries(state.windows).forEach(([id, window]) => {
        if (!window.isOpen || window.isMaximized) {
          updatedWindows[id] = window;
          return;
        }

        // Get base window type from id (e.g., 'about', 'projects', 'project-pokestop' -> 'projectDetail')
        const baseType = id.startsWith('project-') ? 'projectDetail' : id;
        
        let newPosition: Position;
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

// Context Actions Interface
interface AppStateActions {
  openWindow: (id: string, windowData: Partial<WindowData>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePositions: (screenWidth: number, screenHeight: number) => void;
  setScreenSize: (width: number, height: number) => void;
  toggleStartMenu: () => void;
  triggerShutdown: () => void;
  completeShutdown: () => void;
}

interface AppStateContextValue extends AppStateActions {
  state: AppState;
}

// Context
const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

// Provider Component
interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps): React.ReactElement {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  // Action creators
  const actions: AppStateActions = {
    openWindow: useCallback((id: string, windowData: Partial<WindowData>) => {
      dispatch({
        type: ACTIONS.OPEN_WINDOW,
        payload: { id, window: windowData }
      });
    }, []),

    closeWindow: useCallback((id: string) => {
      dispatch({
        type: ACTIONS.CLOSE_WINDOW,
        payload: { id }
      });
    }, []),

    minimizeWindow: useCallback((id: string) => {
      dispatch({
        type: ACTIONS.MINIMIZE_WINDOW,
        payload: { id }
      });
    }, []),

    maximizeWindow: useCallback((id: string) => {
      dispatch({
        type: ACTIONS.MAXIMIZE_WINDOW,
        payload: { id }
      });
    }, []),

    focusWindow: useCallback((id: string) => {
      dispatch({
        type: ACTIONS.FOCUS_WINDOW,
        payload: { id }
      });
    }, []),

    updatePositions: useCallback((screenWidth: number, screenHeight: number) => {
      dispatch({
        type: ACTIONS.UPDATE_POSITIONS,
        payload: { screenWidth, screenHeight }
      });
    }, []),

    setScreenSize: useCallback((width: number, height: number) => {
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

  const value: AppStateContextValue = {
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
export function useAppState(): AppStateContextValue {
  const context = useContext(AppStateContext);
  
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  
  return context;
}

export default AppStateContext;
