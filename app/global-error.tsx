"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Er is iets misgegaan</h2>
        <button onClick={reset}>Opnieuw proberen</button>
      </body>
    </html>
  );
}
