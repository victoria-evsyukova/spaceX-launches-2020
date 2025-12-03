import { render } from '../tests/utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { type LaunchType } from '../types';
import '@testing-library/jest-dom'; 


const mockLaunch: LaunchType = {
    id: 1,
    missionName: 'Starlink 2',
    rocketName: 'Falcon 9',
    missionPatchSmall: 'https://example.com/patch.jpg',
    missionPatch: 'https://example.com/patch-large.jpg',
    details: 'Mission details'
};

describe('Card Component - Basic Tests', () => {
    const mockOnOpenModal = vi.fn();

    beforeEach(() => {
        mockOnOpenModal.mockClear();
    });


    it('renders all required elements', () => {
        render( <Card launch={mockLaunch} onOpenModal={mockOnOpenModal} />);

        expect(screen.getByText('Starlink 2')).toBeInTheDocument();
        expect(screen.getByText('Falcon 9')).toBeInTheDocument();   
        expect(screen.getByRole('img')).toBeInTheDocument();      
        expect(screen.getByText('See more')).toBeInTheDocument();   
    });


    it('displays correct mission and rocket names', () => {
        render(<Card launch={mockLaunch} onOpenModal={mockOnOpenModal} /> );

        expect(screen.getByText('Starlink 2')).toBeInTheDocument();
        expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    });


    it('displays mission patch image with correct src', () => {
        render( <Card launch={mockLaunch} onOpenModal={mockOnOpenModal} /> );

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'https://example.com/patch.jpg');
    });


    it('calls onOpenModal when See more button is clicked', () => {
        render(<Card launch={mockLaunch} onOpenModal={mockOnOpenModal} />);

        const button = screen.getByRole('button', { name: 'See more' });
        fireEvent.click(button);

        expect(mockOnOpenModal).toHaveBeenCalledTimes(1);
    });


    it('renders different mission data correctly', () => {
        const anotherLaunch: LaunchType = {
            id: 2,
            missionName: 'CRS-20',
            rocketName: 'Falcon 9',
            missionPatchSmall: 'https://example.com/crs-patch.jpg',
            missionPatch: 'https://example.com/crs-patch-large.jpg',
            details: 'CRS mission details'
        };

        render(<Card launch={anotherLaunch} onOpenModal={mockOnOpenModal} />);

        expect(screen.getByText('CRS-20')).toBeInTheDocument();
        
        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);

        const firstImage = images[0];
        expect(firstImage).toHaveAttribute('src', 'https://example.com/crs-patch.jpg');
    });


    it('does not crash when rendered', () => {
        expect(() => {
            render(<Card launch={mockLaunch} onOpenModal={mockOnOpenModal} />);
        }).not.toThrow();
    });
});