// Input.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './../shared/ui/Input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

// Моки иконок для тестов
vi.mock('lucide-react', () => ({
    EyeIcon: () => <div data-testid="eye-icon" />,
    EyeOffIcon: () => <div data-testid="eye-off-icon" />,
}));

describe('Input Component', () => {
    // Базовый тест рендеринга
    it('renders basic input correctly', () => {
        render(<Input placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeDefined();
        expect(input.tagName).toBe('INPUT');
    });

    // Тестирование пропсов
    it('accepts and displays value', () => {
        render(<Input value="Test value" onChange={() => { }} />);
        expect(screen.getByDisplayValue('Test value')).toBeDefined();
    });

    it('applies disabled state', () => {
        render(<Input disabled placeholder="Disabled input" />);
        const input = screen.getByPlaceholderText('Disabled input');
        expect(input).toBeDisabled();
        expect(input).toHaveClass('disabled'); // Предполагая, что у вас есть стиль .disabled
    });

    // Тестирование вариантов стилей
    it.each([
        ['primary', 'primary'],
        ['secondary', 'secondary'],
    ])('applies %s variant', (variant, expectedClass) => {
        render(<Input variant={variant as any} />);
        expect(screen.getByRole('textbox').closest('div')).toHaveClass(expectedClass);
    });

    it('applies fullWidth class', () => {
        render(<Input fullWidth />);
        expect(screen.getByRole('textbox').closest('div')).toHaveClass('fullWidth');
    });

    it('applies error state', () => {
        render(<Input error />);
        const wrapper = screen.getByRole('textbox').closest('div');
        expect(wrapper).toHaveClass('error');
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    // Тестирование размеров
    it.each([
        ['sm', 'sm'],
        ['md', 'md'],
        ['lg', 'lg'],
    ])('applies %s size', (size, expectedClass) => {
        render(<Input size={size as any} />);
        expect(screen.getByRole('textbox').closest('div')).toHaveClass(expectedClass);
    });

    // Тестирование элементов интерфейса
    it('renders startAdornment', () => {
        render(<Input startAdornment={<span>$</span>} />);
        expect(screen.getByText('$')).toBeInTheDocument();
        expect(screen.getByText('$').closest('span')).toHaveClass('startAdornment');
    });

    it('renders endAdornment', () => {
        render(<Input endAdornment={<button>X</button>} />);
        expect(screen.getByText('X')).toBeInTheDocument();
        expect(screen.getByText('X').closest('span')).toHaveClass('endAdornment');
    });

    // Тестирование функционала пароля
    describe('Password type', () => {
        it('renders password toggle button', () => {
            render(<Input type="password" />);
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('toggles password visibility', async () => {
            const user = userEvent.setup();
            render(<Input type="password" />);

            const button = screen.getByRole('button');
            const input = screen.getByRole('textbox');

            // По умолчанию пароль скрыт
            expect(input).toHaveAttribute('type', 'password');
            expect(screen.getByTestId('eye-icon')).toBeInTheDocument();

            // Клик для показа пароля
            await user.click(button);
            expect(input).toHaveAttribute('type', 'text');
            expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();

            // Клик для скрытия пароля
            await user.click(button);
            expect(input).toHaveAttribute('type', 'password');
            expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
        });

        it('does not render toggle when disabled', () => {
            render(<Input type="password" disabled />);
            expect(screen.queryByRole('button')).not.toBeInTheDocument();
        });

        it('has proper accessibility labels', () => {
            render(<Input type="password" />);
            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('aria-label', 'Show password');

            fireEvent.click(button);
            expect(button).toHaveAttribute('aria-label', 'Hide password');
        });
    });

    // Тестирование событий
    it('handles onChange event', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();
        render(<Input onChange={handleChange} />);

        await user.type(screen.getByRole('textbox'), 'test');
        expect(handleChange).toHaveBeenCalledTimes(4);
    });

    it('handles onFocus and onBlur events', () => {
        const handleFocus = vi.fn();
        const handleBlur = vi.fn();
        render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

        const input = screen.getByRole('textbox');
        fireEvent.focus(input);
        expect(handleFocus).toHaveBeenCalled();

        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalled();
    });

    // Тестирование комбинаций
    it('combines adornments with password field', () => {
        render(
            <Input
                type="password"
                startAdornment={<span>🔒</span>}
                endAdornment={<span>⚠️</span>}
            />
        );

        expect(screen.getByText('🔒')).toBeInTheDocument();
        expect(screen.getByText('⚠️')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    // Тест доступности
    it('has proper accessibility attributes', () => {
        render(
            <Input
                aria-label="Username"
                error
                required
                id="username-input"
            />
        );

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('aria-label', 'Username');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAttribute('aria-required', 'true');
        expect(input).toHaveAttribute('id', 'username-input');
    });

    // Тест передачи ref
    // it('forwards ref correctly', () => {
    //     const ref = vi.fn();
    //     render(<Input ref={ref} />);
    //     expect(ref).toHaveBeenCalledWith(screen.getByRole('textbox'));
    // });
});