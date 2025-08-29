import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Notification } from './index';

describe('Notification Component', () => {
    it('renders without crashing', () => {
        render(<Notification type="success" />);
        expect(screen.getByText('Успешно выполнено!')).toBeInTheDocument();
    });

    it('displays success message when type is success', () => {
        render(<Notification type="success" />);
        expect(screen.getByText('Успешно выполнено!')).toBeInTheDocument();
    });

    it('displays warning message when type is warning', () => {
        render(<Notification type="warning" />);
        expect(screen.getByText('Ответ неверный! Попробуйте еще раз.')).toBeInTheDocument();
    });

    it('applies success styling when type is success', () => {
        const { container } = render(<Notification type="success" />);
        expect(container.firstChild).toHaveClass('success');
    });

    it('applies warning styling when type is warning', () => {
        const { container } = render(<Notification type="warning" />);
        expect(container.firstChild).toHaveClass('warning');
    });

    it('applies fullWidth class when fullWidth prop is true', () => {
        const { container } = render(<Notification type="success" fullWidth={true} />);
        expect(container.firstChild).toHaveClass('fullWidth');
    });

    it('does not apply fullWidth class when fullWidth prop is false or undefined', () => {
        const { container } = render(<Notification type="success" />);
        expect(container.firstChild).not.toHaveClass('fullWidth');
    });

    it('displays custom success message when provided', () => {
        const customMessage = 'Custom success message';
        render(<Notification type="success" successMessage={customMessage} />);
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('displays custom warning message when provided', () => {
        const customMessage = 'Custom warning message';
        render(<Notification type="warning" warningMessage={customMessage} />);
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

});