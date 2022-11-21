import { ErrorSource as baseErrorSource } from '@akrdevtech/lib-error-handler-middleware'

export const ErrorSource = {
  ...baseErrorSource,
} as const;

type ErrorSource = typeof ErrorSource[keyof typeof ErrorSource];
