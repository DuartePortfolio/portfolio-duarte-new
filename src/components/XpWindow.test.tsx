import { render, screen, fireEvent } from '@testing-library/react';
import XpWindow from './XpWindow';

describe('XpWindow Component', () => {
  const defaultProps = {
    title: 'Test Window',
    children: <div>Window Content</div>,
    onClose: jest.fn(),
    onMinimize: jest.fn(),
    onMaximize: jest.fn(),
    onFocus: jest.fn(),
    isActive: true,
    zIndex: 100
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders window with title and content', () => {
    render(<XpWindow {...defaultProps} />);
    
    expect(screen.getByText('Test Window')).toBeInTheDocument();
    expect(screen.getByText('Window Content')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<XpWindow {...defaultProps} />);
    
    const closeButton = screen.getByTitle('Close');
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onMinimize when minimize button is clicked', () => {
    render(<XpWindow {...defaultProps} />);
    
    const minimizeButton = screen.getByTitle('Minimize');
    fireEvent.click(minimizeButton);
    
    expect(defaultProps.onMinimize).toHaveBeenCalledTimes(1);
  });

  test('calls onMaximize when maximize button is clicked', () => {
    render(<XpWindow {...defaultProps} />);
    
    const maximizeButton = screen.getByTitle('Maximize');
    fireEvent.click(maximizeButton);
    
    expect(defaultProps.onMaximize).toHaveBeenCalledTimes(1);
  });

  test('calls onFocus when window is clicked', () => {
    const { container } = render(<XpWindow {...defaultProps} />);
    
    const windowElement = container.firstChild!;
    fireEvent.mouseDown(windowElement);
    
    expect(defaultProps.onFocus).toHaveBeenCalled();
  });

  test('applies correct z-index', () => {
    const { container } = render(<XpWindow {...defaultProps} zIndex={150} />);
    
    const windowElement = container.firstChild;
    expect(windowElement).toHaveStyle({ zIndex: '150' });
  });

  test('applies active class when isActive is true', () => {
    const { container } = render(<XpWindow {...defaultProps} isActive={true} />);
    
    const windowElement = container.firstChild;
    expect(windowElement).toHaveClass('active');
  });

  test('does not apply active class when isActive is false', () => {
    const { container } = render(<XpWindow {...defaultProps} isActive={false} />);
    
    const windowElement = container.firstChild;
    expect(windowElement).not.toHaveClass('active');
  });

  test('uses custom width and height when provided', () => {
    const { container } = render(
      <XpWindow {...defaultProps} width={800} height={600} />
    );
    
    const windowElement = container.firstChild;
    expect(windowElement).toHaveStyle({
      width: '800px',
      height: '600px'
    });
  });

  test('uses initial position when provided', () => {
    const { container } = render(
      <XpWindow {...defaultProps} initialPosition={{ x: 100, y: 200 }} />
    );
    
    const windowElement = container.firstChild;
    expect(windowElement).toHaveStyle({
      left: '100px',
      top: '200px'
    });
  });

  test('renders in maximized state when isMaximized is true', () => {
    const { container } = render(
      <XpWindow {...defaultProps} isMaximized={true} />
    );
    
    const windowElement = container.firstChild;
    expect(windowElement).toHaveClass('maximized');
  });
});
