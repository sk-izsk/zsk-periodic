import { FallbackProps } from 'zsk-react-error'

export const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 p-8">
    <h1 className="text-lg font-semibold">Something went wrong</h1>
    <pre className="max-w-xl p-4 overflow-auto text-xs rounded opacity-70">{String(error)}</pre>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 text-sm rounded ring-1 ring-current hover:opacity-80"
    >
      Try again
    </button>
  </div>
)
