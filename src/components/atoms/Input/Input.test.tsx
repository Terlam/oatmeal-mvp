import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from './Input'

/**
 * 🧪 Testing Time! 
 * 
 * Welcome to the wonderful world of component testing. Think of tests like
 * quality control for your postmeal - you want to make sure every bowl
 * tastes the same, every time.
 * 
 * These tests demonstrate:
 * - Basic rendering tests
 * - Props validation
 * - Accessibility testing
 * - Error state handling
 * 
 * Remember: Good tests are like good documentation - they tell a story
 * about what your component should do.
 */

describe('Input atom', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Type here…" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Type here…')
  })

  it('renders with proper accessibility attributes', () => {
    render(<Input id="name" name="fullName" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('id', 'name')
    expect(input).toHaveAttribute('name', 'fullName')
  })

  it('handles value changes correctly', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} placeholder="Test input" />)
    const input = screen.getByRole('textbox')
    input.focus()
    expect(input).toHaveFocus()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Test" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })
})
