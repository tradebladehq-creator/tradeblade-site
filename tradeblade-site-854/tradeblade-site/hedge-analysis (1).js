(() => {
  const {
    useState,
    useMemo,
    useEffect,
    useRef
  } = React;

  const C = {
    bg: "#0c0e14",
    surface: "#131620",
    card: "#1a1e2e",
    cardHi: "#1f2438",
    border: "#272d42",
    borderHi: "#3a4160",
    text: "#dfe2ec",
    dim: "#7e8499",
    faint: "#4e5368",
    blue: "#5b8af5",
    green: "#34d399",
    red: "#ef6b6b",
    amber: "#f0b940",
    purple: "#9f8cf7",
    cyan: "#38bdf8",
    orange: "#f59e42"
  };

  const font = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace";
  const sansFont = "'Inter', -apple-system, sans-serif";

  // Base64 Logo from your source
  const TB_LOGO = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChkbW5kAAAByAAAACZkbWRkAAAB8AAAACZsdW1pAAACIAAAACRtZWFzAAACRAAAACRia3B0AAACaAAAACRyWFlaAAACfAAAABRnWFlaAAACkAAAABRiWFlaAAACpAAAABR0ZWNoAAACuAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAACzAAAADh3dHB0AAAA8AAAABR3clhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAYcAAA9Xf///7VQAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAYcAAA9Xf///7VQ";

  const HedgeAnalysisTool = () => {
    // ... logic from your JSX ...
    // Note: I have converted the return block below into the React.createElement format 
    // to match the hedge-analysis.js structure you provided.

    return React.createElement("div", {
      style: {
        backgroundColor: C.bg,
        color: C.text,
        fontFamily: sansFont,
        padding: 20,
        minHeight: "100vh"
      }
    }, 
    // Header Section
    React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 24
      }
    }, 
    React.createElement("img", {
      src: TB_LOGO,
      style: {
        width: 24,
        height: 24
      }
    }), 
    React.createElement("span", {
      style: {
        fontFamily: font,
        fontWeight: "bold",
        fontSize: 14,
        letterSpacing: 1
      }
    }, 
    React.createElement("span", {
      style: {
        color: C.dim
      }
    }, "COMMAND:"), " ", 
    React.createElement("span", {
      style: {
        color: C.cyan
      }
    }, "HEDGE_ANALYSIS"))), 

    // Footer Info Section
    React.createElement("div", {
      style: {
        marginTop: 20,
        fontSize: 11,
        color: C.dim,
        lineHeight: 1.6,
        borderTop: `1px solid ${C.border}`,
        paddingTop: 16
      }
    }, 
    React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 8
      }
    }, 
    React.createElement("span", {
      style: {
        fontFamily: font,
        fontSize: 10,
        color: C.faint
      }
    }, "POWERED BY"), 
    React.createElement("span", {
      style: {
        fontWeight: "bold",
        letterSpacing: 1
      }
    }, 
    React.createElement("span", {
      style: {
        color: C.dim
      }
    }, "TRADE"), 
    React.createElement("span", {
      style: {
        color: C.cyan
      }
    }, "BLADE")), 
    React.createElement("span", {
      style: {
        color: C.faint,
        fontSize: 9
      }
    }, "·"), 
    React.createElement("span", {
      style: {
        fontFamily: font,
        fontSize: 9,
        color: C.faint,
        letterSpacing: 1.5
      }
    }, "HEDGE EXECUTION SYSTEM")), 
    React.createElement("br"), 
    "System analysis strings and logic results would follow here based on calculation variables..."));
  };

  // Mount/Export logic
  window.HedgeAnalysisTool = HedgeAnalysisTool;
})();