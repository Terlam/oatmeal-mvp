import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from './Input'

describe('Input atom', () => {
  // it('renders an input element', () => {
  //   render(<Input placeholder="Type here…" />)
  //   const input = screen.getByRole('textbox')
  //   expect(input).toBeInTheDocument()
  //   expect(input).toHaveAttribute('placeholder', 'Type here…')
  // })

  // it('renders a label when `label` prop is provided', () => {
  //   render(<Input id="name" label="Full Name" />)
  //   const input = screen.getByLabelText('Full Name')
  //   expect(input).toBeInTheDocument()
  // })

  // it('shows an error message and aria-invalid when `error` prop is provided', () => {
  //   render(<Input id="email" error="Required field" />)
  //   const errorMsg = screen.getByText('Required field')
  //   expect(errorMsg).toBeInTheDocument()
  //   const input = screen.getByRole('textbox')
  //   expect(input).toHaveAttribute('aria-invalid', 'true')
  //   expect(input).toHaveClass('border-red-500', 'focus:ring-red-500')
  // })

  // it('applies default variant styles when no `variant` is passed', () => {
  //   render(<Input placeholder="Default style" id="test" />)
  //   const input = screen.getByRole('textbox')
  //   // default border-gray-300 and focus:ring-blue-500
  //   expect(input).toHaveClass('border-gray-300', 'focus:ring-blue-500')
  // })

  // it('applies primary variant styles', () => {
  //   render(<Input variant="primary" placeholder="Primary" id="p" />)
  //   const input = screen.getByRole('textbox')
  //   expect(input).toHaveClass('border-blue-500', 'focus:ring-blue-500')
  // })

  // it('applies secondary variant styles', () => {
  //   render(<Input variant="secondary" placeholder="Secondary" id="s" />)
  //   const input = screen.getByRole('textbox')
  //   expect(input).toHaveClass('border-gray-500', 'focus:ring-gray-500')
  // })
})
