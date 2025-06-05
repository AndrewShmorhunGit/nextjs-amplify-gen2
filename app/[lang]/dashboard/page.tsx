export default function HomePage() {
  return (
    <div className="flex items-center justify-center bg-[var(--color-bg-main)]">
      <div className="text-center mt-24">
        <div className="mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
              <path d="M1 21h22" />
              <path d="M12 7v8" />
              <path d="m9 11 3-3 3 3" />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Inventory
          </h1>
        </div>
        <p className="text-lg text-[var(--color-text-light)]">
          Welocme `UserName`!
        </p>
      </div>
    </div>
  );
}
