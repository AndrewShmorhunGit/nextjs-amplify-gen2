export function PageLoader() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium text-[var(--color-text-main)]">
          Loading...
        </p>
      </div>
    </div>
  );
}
