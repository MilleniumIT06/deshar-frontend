import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { Logo } from '../shared/ui/Logo'
 
test('Logo', () => {
  render(<Logo />)
  expect(screen.getByRole('img')).toBeDefined()
})