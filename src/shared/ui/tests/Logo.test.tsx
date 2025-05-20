import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo } from '../Logo'
 
test('Logo', () => {
  render(<Logo />)
  expect(screen.getByRole('img')).toBeDefined()
})