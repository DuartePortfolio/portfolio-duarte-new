import { render, screen } from '@testing-library/react';
import AboutMe from './AboutMe';

describe('AboutMe Component', () => {
  test('renders heading', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  test('renders introduction text', () => {
    render(<AboutMe />);
    
    expect(screen.getByText(/Hello! I'm Duarte Fernandes/i)).toBeInTheDocument();
    expect(screen.getByText(/Porto, Portugal/i)).toBeInTheDocument();
  });

  test('renders skills section', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
  });

  test('renders education section', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText(/ESMAD/i)).toBeInTheDocument();
  });

  test('renders social links', () => {
    render(<AboutMe />);
    
    expect(screen.getByText('Find Me Here')).toBeInTheDocument();
    
    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'));
    
    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
  });

  test('renders profile photo', () => {
    render(<AboutMe />);
    
    const img = screen.getByAltText('Duarte Fernandes');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
  });

  test('renders all skill categories', () => {
    render(<AboutMe />);
    
    const skillCategories = ['Java', 'Node.js', 'MySQL', 'React', 'Git'];
    
    skillCategories.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });
});
