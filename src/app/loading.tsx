export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        background: "var(--bg-light, #f8faff)",
        color: "var(--midnight-navy, #051f44)",
      }}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          position: "relative",
          width: 56,
          height: 56,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid rgba(13, 65, 138, 0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "var(--vermilion, #f04a2a)",
            borderRightColor: "var(--corporate-blue, #0d418a)",
            animation:
              "spin 0.9s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite",
          }}
        />
      </div>

      <p
        style={{
          fontFamily:
            "var(--font-manrope), 'Manrope', 'Inter', Arial, sans-serif",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "var(--corporate-blue, #0d418a)",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        Loading Precision Instruments…
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
