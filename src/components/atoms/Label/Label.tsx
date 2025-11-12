import React from 'react'
import { Label as FlowLabel } from 'flowbite-react'

export interface LabelProps extends React.ComponentProps<typeof FlowLabel> {
  value?: string
}

export const Label: React.FC<LabelProps> = ({ value, children, ...rest }) => (
  <FlowLabel {...rest}>
    {value ?? children}
  </FlowLabel>
)
