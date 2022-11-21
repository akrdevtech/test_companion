import { HttpStatusMessage as baseHttpStatusMessage } from '@akrdevtech/lib-error-handler-middleware'

export const HttpStatusMessage = {
  ...baseHttpStatusMessage,
} as const;

type HttpStatusMessage = typeof HttpStatusMessage[keyof typeof HttpStatusMessage];
