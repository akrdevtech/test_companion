import { HttpStatusCode as baseHttpStatusCode } from '@akrdevtech/lib-error-handler-middleware'

export const HttpStatusCode = {
  ...baseHttpStatusCode,
} as const;

type HttpStatusCode = typeof HttpStatusCode[keyof typeof HttpStatusCode];
