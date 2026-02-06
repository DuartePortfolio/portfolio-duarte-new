import { render, screen } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';
import MobileLayout from './MobileLayout';

// Mock the useMediaQuery hook
jest.mock('../hooks/useMediaQuery');

describe('MobileLayout Component', () => {
  const defaultProps = {
    onShutdown: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useMediaQuery.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false
    });
  });

  test('renders mobile header', () => {
    render(<MobileLayout {...defaultProps} />);
    
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
  });

  test('renders app switcher buttons', () => {
    render(<MobileLayout {...defaultProps} />);
    
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('shows About Me by default', () => {
    render(<MobileLayout {...defaultProps} />);
    
    // About Me content should be visible
    expect(screen.getByText(/Hello! I'm Duarte/i)).toBeInTheDocument();
  });

  test('renders all required app sections', () => {
    render(<MobileLayout {...defaultProps} />);
    
    // Check that the app switcher has all buttons
    const buttons = screen.getAllByRole('button');
    const appButtons = buttons.filter(btn => 
      ['About Me', 'Projects', 'Resume', 'Contact'].some(app => 
        btn.textContent.includes(app)
      )
    );
    
    expect(appButtons.length).toBeGreaterThanOrEqual(4);
  });

  test('includes shutdown button', () => {
    render(<MobileLayout {...defaultProps} />);
    
    const shutdownButton = screen.getByText(/Turn off/i);
    expect(shutdownButton).toBeInTheDocument();
  });
});
