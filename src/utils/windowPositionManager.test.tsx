import windowPositionManager from './windowPositionManager';

describe('Window Position Manager', () => {
  describe('getDefaultPosition', () => {
    test('calculates about window position correctly', () => {
      const position = windowPositionManager.getDefaultPosition('about', 1920, 1080);
      
      expect(position.x).toBeGreaterThan(100);
      expect(position.y).toBe(40);
    });

    test('calculates projects window position correctly', () => {
      const position = windowPositionManager.getDefaultPosition('projects', 1920, 1080);
      
      expect(position.x).toBeLessThanOrEqual(110);
      expect(position.y).toBe(40);
    });

    test('calculates contact window position correctly', () => {
      const position = windowPositionManager.getDefaultPosition('contact', 1920, 1080);
      
      expect(position.x).toBeGreaterThan(100);
      expect(position.y).toBe(40);
    });

    test('calculates resume window position correctly', () => {
      const position = windowPositionManager.getDefaultPosition('resume', 1920, 1080);
      
      expect(position.x).toBeLessThanOrEqual(250);
      expect(position.y).toBe(200);
    });

    test('returns default position for unknown window type', () => {
      const position = windowPositionManager.getDefaultPosition('unknown', 1920, 1080);
      
      expect(position).toHaveProperty('x');
      expect(position).toHaveProperty('y');
      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeGreaterThanOrEqual(0);
    });

    test('adjusts positions for smaller screens', () => {
      const largeScreenPos = windowPositionManager.getDefaultPosition('about', 1920, 1080);
      const smallScreenPos = windowPositionManager.getDefaultPosition('about', 1024, 768);
      
      expect(smallScreenPos.x).toBeLessThan(largeScreenPos.x);
    });
  });

  describe('getCascadedPosition', () => {
    test('returns base position for index 0', () => {
      const position = windowPositionManager.getCascadedPosition(100, 100, 0, 1920, 1080);
      
      expect(position.x).toBe(100);
      expect(position.y).toBe(100);
    });

    test('offsets position for subsequent windows', () => {
      const pos1 = windowPositionManager.getCascadedPosition(100, 100, 0, 1920, 1080);
      const pos2 = windowPositionManager.getCascadedPosition(100, 100, 1, 1920, 1080);
      const pos3 = windowPositionManager.getCascadedPosition(100, 100, 2, 1920, 1080);
      
      expect(pos2.x).toBeGreaterThan(pos1.x);
      expect(pos2.y).toBeGreaterThan(pos1.y);
      expect(pos3.x).toBeGreaterThan(pos2.x);
      expect(pos3.y).toBeGreaterThan(pos2.y);
    });

    test('keeps windows within screen bounds', () => {
      const position = windowPositionManager.getCascadedPosition(
        1800, // very close to right edge
        1000, // very close to bottom
        5,
        1920,
        1080
      );
      
      // Should be constrained to fit on screen (assuming 700x500 window)
      expect(position.x + 700).toBeLessThanOrEqual(1920);
      expect(position.y + 500).toBeLessThanOrEqual(1080);
    });
  });

  describe('getCenteredPosition', () => {
    test('centers window on screen', () => {
      const position = windowPositionManager.getCenteredPosition(1920, 1080, 700, 500);
      
      const expectedX = (1920 - 700) / 2;
      const expectedY = (1080 - 500) / 2;
      
      expect(position.x).toBe(expectedX);
      expect(position.y).toBe(expectedY);
    });

    test('uses default window dimensions when not provided', () => {
      const position = windowPositionManager.getCenteredPosition(1920, 1080);
      
      expect(position).toHaveProperty('x');
      expect(position).toHaveProperty('y');
      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeGreaterThanOrEqual(0);
    });

    test('handles small screens', () => {
      const position = windowPositionManager.getCenteredPosition(800, 600, 700, 500);
      
      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeGreaterThanOrEqual(0);
    });
  });

  describe('constrainToScreen', () => {
    test('leaves valid position unchanged', () => {
      const position = windowPositionManager.constrainToScreen(100, 100, 1920, 1080, 700, 500);
      
      expect(position.x).toBe(100);
      expect(position.y).toBe(100);
    });

    test('constrains negative x to 0', () => {
      const position = windowPositionManager.constrainToScreen(-50, 100, 1920, 1080, 700, 500);
      
      expect(position.x).toBe(0);
      expect(position.y).toBe(100);
    });

    test('constrains negative y to 0', () => {
      const position = windowPositionManager.constrainToScreen(100, -50, 1920, 1080, 700, 500);
      
      expect(position.x).toBe(100);
      expect(position.y).toBe(0);
    });

    test('constrains x when window would go off right edge', () => {
      const position = windowPositionManager.constrainToScreen(1500, 100, 1920, 1080, 700, 500);
      
      expect(position.x + 700).toBeLessThanOrEqual(1920);
      expect(position.y).toBe(100);
    });

    test('constrains y when window would go off bottom edge', () => {
      const position = windowPositionManager.constrainToScreen(100, 800, 1920, 1080, 700, 500);
      
      expect(position.x).toBe(100);
      expect(position.y + 500).toBeLessThanOrEqual(1080);
    });

    test('constrains both x and y when needed', () => {
      const position = windowPositionManager.constrainToScreen(2000, 2000, 1920, 1080, 700, 500);
      
      expect(position.x + 700).toBeLessThanOrEqual(1920);
      expect(position.y + 500).toBeLessThanOrEqual(1080);
    });
  });
});
