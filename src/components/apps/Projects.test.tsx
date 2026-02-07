import { render, screen, fireEvent } from '@testing-library/react';
import Projects from './Projects';

describe('Projects Component', () => {
  const mockOnProjectClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders heading', () => {
    render(<Projects onProjectClick={mockOnProjectClick} />);
    
    expect(screen.getByText('My Projects')).toBeInTheDocument();
  });

  test('renders all project cards', () => {
    render(<Projects onProjectClick={mockOnProjectClick} />);
    
    expect(screen.getByText('PokéStop')).toBeInTheDocument();
    expect(screen.getByText('Voltzy')).toBeInTheDocument();
    expect(screen.getByText('bus-api')).toBeInTheDocument();
  });

  test('renders project descriptions', () => {
    render(<Projects onProjectClick={mockOnProjectClick} />);
    
    expect(screen.getByText(/Microservices-based Pokémon/i)).toBeInTheDocument();
    expect(screen.getByText(/Smart Energy Management/i)).toBeInTheDocument();
  });

  test('renders project technologies', () => {
    render(<Projects onProjectClick={mockOnProjectClick} />);
    
    // Check for technology mentions
    const techElements = screen.getAllByText(/Technologies:/i);
    expect(techElements.length).toBeGreaterThan(0);
  });

  test('calls onProjectClick when project card is clicked', () => {
    const { container } = render(<Projects onProjectClick={mockOnProjectClick} />);
    
    const pokestopCard = container.firstChild!.firstChild; // First project card
    fireEvent.click(pokestopCard!);
    
    expect(mockOnProjectClick).toHaveBeenCalledTimes(1);
    expect(mockOnProjectClick).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'pokestop',
        title: 'PokéStop'
      })
    );
  });

  test('renders project images', () => {
    render(<Projects onProjectClick={mockOnProjectClick} />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(3); // At least one per project
  });

  test('renders call-to-action text', () => {
    render(<Projects onProjectClick={mockOnProjectClick} />);
    
    const ctaTexts = screen.getAllByText('Click to view details →');
    expect(ctaTexts.length).toBeGreaterThan(0);
  });
});
