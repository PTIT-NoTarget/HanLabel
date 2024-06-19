// react-app-env.d.ts
interface ProcessEnv {
  readonly REACT_APP_API_URL: string;
}

interface Process {
  env: ProcessEnv;
}

declare var process: Process;
