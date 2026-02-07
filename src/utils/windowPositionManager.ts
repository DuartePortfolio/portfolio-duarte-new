/**
 * Window Position Manager
 * Handles responsive positioning for Windows XP-style desktop windows
 */

const windowPositionManager = {
  /**
   * Calculate responsive position based on window ID and screen dimensions
   * @param {string} windowId - The unique identifier for the window
   * @param {number} screenWidth - Current screen width
   * @param {number} screenHeight - Current screen height
   * @returns {{x: number, y: number}} - The calculated position
   */
  getDefaultPosition: (windowId: string, screenWidth: number, screenHeight: number) => {
    // Define base positions for each window type
    const positions: Record<string, { x: number; y: number }> = {
      'about': {
        // Right-aligned, responsive to screen width
        x: Math.max(100, screenWidth - 800),
        y: 40
      },
      'projects': {
        // Left side, slight offset
        x: Math.min(110, screenWidth * 0.08),
        y: 40
      },
      'contact': {
        // Right-aligned, below About Me
        x: Math.max(100, screenWidth - 900),
        y: 40
      },
      'resume': {
        // Left-center area
        x: Math.min(250, screenWidth * 0.15),
        y: 200
      },
      'projectDetail': {
        // Centered-ish, slight offset
        x: Math.min(300, screenWidth * 0.2),
        y: 80
      }
    };

    // Return position or default fallback
    return positions[windowId] || {
      x: Math.min(100, screenWidth * 0.1),
      y: Math.min(100, screenHeight * 0.1)
    };
  },

  /**
   * Calculate cascaded position for multiple windows (e.g., project details)
   * @param {number} baseX - Base X coordinate
   * @param {number} baseY - Base Y coordinate
   * @param {number} index - Index of the window in the cascade
   * @param {number} screenWidth - Current screen width
   * @param {number} screenHeight - Current screen height
   * @returns {{x: number, y: number}} - The cascaded position
   */
  getCascadedPosition: (baseX: number, baseY: number, index: number, screenWidth: number, screenHeight: number) => {
    const offset = 30; // Pixels to offset each cascaded window
    const maxOffset = 150; // Maximum total offset before wrapping

    let x = baseX + (index * offset);
    let y = baseY + (index * offset);

    // Wrap around if we've cascaded too far
    const totalOffset = index * offset;
    if (totalOffset > maxOffset) {
      const cycles = Math.floor(totalOffset / maxOffset);
      x = baseX + ((index * offset) % maxOffset);
      y = baseY + ((index * offset) % maxOffset) + (cycles * 40);
    }

    // Ensure window stays within bounds
    const windowWidth = 700; // Approximate window width
    const windowHeight = 500; // Approximate window height

    if (x + windowWidth > screenWidth) {
      x = Math.max(20, screenWidth - windowWidth - 20);
    }

    if (y + windowHeight > screenHeight) {
      y = Math.max(20, screenHeight - windowHeight - 20);
    }

    return { x, y };
  },

  /**
   * Calculate centered position for a window
   * @param {number} screenWidth - Current screen width
   * @param {number} screenHeight - Current screen height
   * @param {number} windowWidth - Width of the window to center
   * @param {number} windowHeight - Height of the window to center
   * @returns {{x: number, y: number}} - The centered position
   */
  getCenteredPosition: (screenWidth: number, screenHeight: number, windowWidth = 700, windowHeight = 500) => {
    return {
      x: Math.max(0, (screenWidth - windowWidth) / 2),
      y: Math.max(0, (screenHeight - windowHeight) / 2)
    };
  },

  /**
   * Ensure position is within screen bounds
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @param {number} screenWidth - Current screen width
   * @param {number} screenHeight - Current screen height
   * @param {number} windowWidth - Width of the window
   * @param {number} windowHeight - Height of the window
   * @returns {{x: number, y: number}} - Constrained position
   */
  constrainToScreen: (x: number, y: number, screenWidth: number, screenHeight: number, windowWidth = 700, windowHeight = 500) => {
    const minX = 0;
    const minY = 0;
    const maxX = screenWidth - windowWidth;
    const maxY = screenHeight - windowHeight;

    return {
      x: Math.max(minX, Math.min(x, maxX)),
      y: Math.max(minY, Math.min(y, maxY))
    };
  }
};

export default windowPositionManager;
