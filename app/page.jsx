export default function Page() {
  return (
    <main
      style={{
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          margin: 0,
          background:
            'linear-gradient(120deg, #a855f7, #6366f1, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Ready to build?
      </h1>
      <p
        style={{
          marginTop: '1.25rem',
          fontSize: '1.125rem',
          color: '#94a3b8',
        }}
      >
        ai-builder-rules placeholder · Next.js on Heroku
      </p>
    </main>
  );
}
