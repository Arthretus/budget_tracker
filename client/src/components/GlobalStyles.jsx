// components/GlobalStyles.jsx
// Injects Google Fonts and all shared CSS utility classes used across components.
// Kept in one place so styles are easy to find and update.

export default function GlobalStyles() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

        /* Card container */
        .card {
          background: #13131a;
          border: 1px solid #1e1e2e;
          border-radius: 16px;
          padding: 20px;
        }

        /* Base button */
        .btn {
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          border-radius: 10px;
          transition: all 0.15s;
        }
        .btn:hover { transform: translateY(-1px); }

        /* Base input / select */
        .input {
          background: #1a1a26;
          border: 1px solid #2a2a3e;
          border-radius: 10px;
          color: #f0f0f5;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          padding: 10px 14px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus { border-color: #6c63ff; }

        /* Pill tag (category / type labels) */
        .tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        /* Tab / section entrance animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.3s ease forwards; }

        /* Budget progress bar fill */
        @keyframes progress {
          from { width: 0%; }
          to   { width: var(--w); }
        }
        .prog-bar { animation: progress 1s ease forwards; }

        /* Expense list row hover */
        .row-hover:hover { background: #16161f; }
      `}</style>
    </>
  );
}
