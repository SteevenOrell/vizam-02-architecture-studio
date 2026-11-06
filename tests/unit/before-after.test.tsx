import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const { BeforeAfter } = await import('@/components/projects/BeforeAfter');
const fake = { src: '/x.webp', width: 10, height: 10 };

describe('BeforeAfter', () => {
  it('exposes ARIA slider semantics and responds to the keyboard', () => {
    render(<BeforeAfter title="Test room" caption="Illustrative" before={{ src: fake, alt: 'before' }} after={{ src: fake, alt: 'after' }} />);
    const slider = screen.getByRole('slider', { name: /Before and after comparison, Test room/ });
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveAttribute('aria-valuenow', '52');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(slider).toHaveAttribute('aria-valuenow', '100');
    expect(slider).toHaveAttribute('aria-valuetext', '100% before, 0% after');
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });
});
