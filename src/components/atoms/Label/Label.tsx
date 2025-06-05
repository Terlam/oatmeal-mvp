import { Label as FlowLabel } from 'flowbite-react'
export const Label: React.FC<
  React.ComponentProps<typeof FlowLabel> & { value?: string }
> = ({ value, children, ...rest }) => (
  <FlowLabel {...rest}>
    {value ?? children}
  </FlowLabel>
)
