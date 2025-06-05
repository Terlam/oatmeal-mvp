import { FileInput as FlowFile } from 'flowbite-react'

export const FileInput: React.FC<
  React.ComponentProps<typeof FlowFile> & { helperText?: React.ReactNode }
> = ({ helperText, ...rest }) => (
  <>
    <FlowFile {...rest} />
    {helperText && (
      <p className="mt-1 text-sm text-gray-500">{helperText}</p>
    )}
  </>
)
