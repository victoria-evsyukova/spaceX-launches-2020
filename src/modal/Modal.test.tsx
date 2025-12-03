import { render } from '../tests/utils'
import { test, expect, vi, beforeAll, afterEach } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import Modal from './Modal';
import '@testing-library/jest-dom';

beforeAll(() => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }));
});

afterEach(() => {
    cleanup();
});

const mockLaunch = {
    id: 1,
    missionName: 'Test Mission',
    rocketName: 'Test Rocket',
    missionPatchSmall: 'test.jpg',
    missionPatch: 'test-large.jpg',
    details: 'Test details'
};

test('Modal shows mission data when launch is provided', () => {
    const mockOnClose = vi.fn();
  
    render(
        <Modal onClose={mockOnClose} launch={mockLaunch} />
    );

    const missionElements = screen.getAllByText('Test Mission');
    expect(missionElements.length).toBeGreaterThan(0);
    expect(missionElements.length).toBe(2);
    
    const rocketElements = screen.getAllByText('Test Rocket');
    expect(rocketElements.length).toBe(1);
    
    const detailsElements = screen.getAllByText('Test details');
    expect(detailsElements.length).toBe(1);
});

test('Modal does not render when launch is null', () => {
    const mockOnClose = vi.fn();
    
    render(
        <Modal onClose={mockOnClose} launch={null} />
    );

    expect(screen.queryByText('Test Mission')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Rocket')).not.toBeInTheDocument();
});

