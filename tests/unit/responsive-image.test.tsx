import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

describe('responsive raster source bounds', () => {
  it('does not advertise widths beyond the original while retaining optimized variants', () => {
    render(<ResponsiveImage src={{ src: '/fixture.webp', width: 1280, height: 720 }} alt="Architecture fixture" fill sizes="100vw" />);
    const image = screen.getByAltText('Architecture fixture');
    const choices = image.getAttribute('srcset')!.split(',').map(value => Number(value.trim().match(/ (\d+)w$/)![1]));
    expect(choices.length).toBeGreaterThan(1);
    expect(choices.every(width => width <= 1280)).toBe(true);
    expect(image.getAttribute('src')).toContain('/_next/image?');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
