import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Label } from './Label'

describe('Label atom', () => {
  it('renders children text', () => {
    render(<Label>My Label</Label>)
    expect(screen.getByText('My Label')).toBeInTheDocument()
  })

  it('forwards htmlFor attribute', () => {
    render(<Label htmlFor="email-input">Email</Label>)
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('for', 'email-input')
  })

  it('applies default variant class', () => {
    render(<Label>Default</Label>)
    const label = screen.getByText('Default')
    expect(label).toHaveClass('text-gray-700')
  })

  it('applies inverse variant class', () => {
    render(<Label variant="inverse">Inverse</Label>)
    const label = screen.getByText('Inverse')
    expect(label).toHaveClass('text-gray-100')
  })

  it('applies error variant class', () => {
    render(<Label variant="error">Error</Label>)
    const label = screen.getByText('Error')
    expect(label).toHaveClass('text-red-600')
  })

  it('applies size classes', () => {
    render(
      <div>
        <Label size="sm" htmlFor="a">Small</Label>
        <Label size="md" htmlFor="b">Medium</Label>
        <Label size="lg" htmlFor="c">Large</Label>
      </div>
    )
    expect(screen.getByText('Small')).toHaveClass('text-xs')
    expect(screen.getByText('Medium')).toHaveClass('text-sm')
    expect(screen.getByText('Large')).toHaveClass('text-base')
  })
})
