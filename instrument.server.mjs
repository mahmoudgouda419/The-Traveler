import * as Sentry from "@sentry/react-router";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
Sentry.init({
    dsn: "https://c89b1b7800c1ebd3fd5dad969e51db67@o4511465539829760.ingest.us.sentry.io/4511502446559232",
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    // Add our Profiling integration
    integrations: [nodeProfilingIntegration()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    // We recommend adjusting this value in production
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#tracesSampleRate
    tracesSampleRate: 1.0,
    // Enable profiling for a percentage of sessions
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#profileSessionSampleRate
    profileSessionSampleRate: 1.0,
});