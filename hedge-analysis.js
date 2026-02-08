(() => {
  const { useState, useMemo } = React, C = {
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
  }, font = "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", sansFont = "'Inter', -apple-system, sans-serif", TB_LOGO = "data:image/png;base64,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", NT_MICRO_COMMISSION = { lifetime: 0.65, monthly: 0.85, free: 0.95 }, NT_MICRO_RT = { lifetime: 1.3, monthly: 1.7, free: 1.9 }, INSTRUMENTS = {
    "ES/MES": {
      full: "ES",
      micro: "MES",
      name: "S&P 500",
      fullTickVal: 12.5,
      microTickVal: 1.25,
      tickSize: 0.25,
      fullPointVal: 50,
      microPointVal: 5,
      intradayMargin: 50,
      initialMargin: 1166,
      maintenanceMargin: 1060,
      defaultFriction: 35
    },
    "NQ/MNQ": {
      full: "NQ",
      micro: "MNQ",
      name: "Nasdaq 100",
      fullTickVal: 5,
      microTickVal: 0.5,
      tickSize: 0.25,
      fullPointVal: 20,
      microPointVal: 2,
      intradayMargin: 100,
      initialMargin: 1738,
      maintenanceMargin: 1580,
      defaultFriction: 28
    },
    "YM/MYM": {
      full: "YM",
      micro: "MYM",
      name: "Dow Jones",
      fullTickVal: 5,
      microTickVal: 0.5,
      tickSize: 1,
      fullPointVal: 5,
      microPointVal: 0.5,
      intradayMargin: 50,
      initialMargin: 825,
      maintenanceMargin: 750,
      defaultFriction: 28
    },
    "RTY/M2K": {
      full: "RTY",
      micro: "M2K",
      name: "Russell 2000",
      fullTickVal: 5,
      microTickVal: 0.5,
      tickSize: 0.1,
      fullPointVal: 50,
      microPointVal: 5,
      intradayMargin: 50,
      initialMargin: 638,
      maintenanceMargin: 580,
      defaultFriction: 28
    }
  };
  function Section({ title, icon, children, accent = C.blue }) {
    return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
      borderBottom: `1px solid ${C.border}`,
      paddingBottom: 8
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, icon), /* @__PURE__ */ React.createElement("span", { style: {
      fontFamily: sansFont,
      fontSize: 13,
      fontWeight: 700,
      color: accent,
      textTransform: "uppercase",
      letterSpacing: 1.5
    } }, title)), children);
  }
  function Param({ label, value, onChange, min, max, step = 1, fmt, sub }) {
    const display = fmt ? fmt(value) : value;
    return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 12, color: C.dim } }, label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 13, color: C.text, fontWeight: 600 } }, display)), sub && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: sansFont, fontSize: 10, color: C.faint, marginTop: 1 } }, sub), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value,
        onChange: (e) => onChange(Number(e.target.value)),
        style: { width: "100%", accentColor: C.blue, marginTop: 4, height: 4 }
      }
    ));
  }
  function Toggle({ options, value, onChange, accent = C.blue }) {
    return /* @__PURE__ */ React.createElement("div", { style: {
      display: "inline-flex",
      background: C.card,
      borderRadius: 8,
      border: `1px solid ${C.border}`,
      overflow: "hidden"
    } }, options.map((opt) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: opt.value,
        onClick: () => onChange(opt.value),
        style: {
          fontFamily: sansFont,
          fontSize: 12,
          fontWeight: 600,
          padding: "8px 16px",
          border: "none",
          cursor: "pointer",
          background: value === opt.value ? accent : "transparent",
          color: value === opt.value ? C.bg : C.dim,
          transition: "all 0.15s ease"
        }
      },
      opt.label
    )));
  }
  function Dropdown({ label, value, onChange, options }) {
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 12, color: C.dim } }, label), /* @__PURE__ */ React.createElement(
      "select",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        style: {
          fontFamily: font,
          fontSize: 12,
          fontWeight: 600,
          background: C.card,
          color: C.cyan,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          padding: "6px 10px",
          cursor: "pointer",
          outline: "none"
        }
      },
      options.map((opt) => /* @__PURE__ */ React.createElement(
        "option",
        {
          key: opt.value,
          value: opt.value,
          style: { background: C.card, color: C.text }
        },
        opt.label
      ))
    ));
  }
  function ScenarioCard({ title, prob, items, net, color, icon }) {
    const positive = net >= 0;
    return /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      borderLeft: `3px solid ${color}`,
      padding: "16px 18px",
      marginBottom: 12
    } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15 } }, icon), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 13, fontWeight: 700, color: C.text } }, title)), /* @__PURE__ */ React.createElement("span", { style: {
      fontFamily: font,
      fontSize: 11,
      color: C.dim,
      background: C.cardHi,
      padding: "2px 8px",
      borderRadius: 4
    } }, "P = ", (prob * 100).toFixed(0), "%")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 3, marginBottom: 10 } }, items.map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "3px 0",
      borderBottom: i < items.length - 1 ? `1px solid ${C.border}22` : "none"
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, color: C.dim } }, item.label), /* @__PURE__ */ React.createElement("span", { style: {
      fontFamily: font,
      fontSize: 11,
      fontWeight: 500,
      color: item.skip ? C.faint : item.val >= 0 ? C.green : C.red
    } }, item.skip ? item.fmt : (item.val >= 0 ? "+" : "") + (item.fmt || `$${item.val.toFixed(0)}`))))), /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: `1px solid ${C.border}`,
      paddingTop: 8
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, fontWeight: 700, color: C.text } }, "Scenario Net"), /* @__PURE__ */ React.createElement("span", { style: {
      fontFamily: font,
      fontSize: 15,
      fontWeight: 800,
      color: positive ? C.green : C.red
    } }, positive ? "+" : "", "$", net.toFixed(0))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 10, color: C.faint } }, "Weighted EV contribution"), /* @__PURE__ */ React.createElement("span", { style: {
      fontFamily: font,
      fontSize: 11,
      fontWeight: 600,
      color: prob * net >= 0 ? C.green : C.red
    } }, prob * net >= 0 ? "+" : "", "$", (prob * net).toFixed(2))));
  }
  function MetricBox({ label, value, sub, color = C.text }) {
    return /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "12px 14px",
      textAlign: "center",
      flex: 1,
      minWidth: 120
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: font, fontSize: 18, fontWeight: 800, color } }, value), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: sansFont, fontSize: 10, color: C.dim, marginTop: 2 } }, label), sub && /* @__PURE__ */ React.createElement("div", { style: { fontFamily: sansFont, fontSize: 9, color: C.faint, marginTop: 2 } }, sub));
  }
  function HedgeAnalysis() {
    const [instrument, setInstrument] = useState("ES/MES"), [accountType, setAccountType] = useState("2-step"), [passRate, setPassRate] = useState(10), [payoutRate, setPayoutRate] = useState(25), [avgPeakFail, setAvgPeakFail] = useState(500), [friction, setFriction] = useState(35), [evalHedgeContracts, setEvalHedgeContracts] = useState(1), [paHedgeContracts, setPaHedgeContracts] = useState(1), [evalCost, setEvalCost] = useState(40), [paCost, setPaCost] = useState(85), [profitTarget, setProfitTarget] = useState(3e3), [trailingDD, setTrailingDD] = useState(2500), [payoutAmt, setPayoutAmt] = useState(2e3), [payoutThreshold, setPayoutThreshold] = useState(2600), [stfCost, setStfCost] = useState(150), [stfPayoutRate, setStfPayoutRate] = useState(25), [stfHedgeContracts, setStfHedgeContracts] = useState(3), inst = INSTRUMENTS[instrument], handleInstrumentChange = (newInst) => {
      setInstrument(newInst), setFriction(INSTRUMENTS[newInst].defaultFriction);
    }, evalHedgeRatio = evalHedgeContracts * 0.1, paHedgeRatio = paHedgeContracts * 0.1, stfHedgeRatio = stfHedgeContracts * 0.1, evalHedgeTickVal = (evalHedgeContracts * inst.microTickVal).toFixed(2), paHedgeTickVal = (paHedgeContracts * inst.microTickVal).toFixed(2), stfHedgeTickVal = (stfHedgeContracts * inst.microTickVal).toFixed(2), r2 = useMemo(() => {
      const pPass = passRate / 100, pFail = 1 - pPass, pPayGivenPass = payoutRate / 100, pFailPA = 1 - pPayGivenPass, p1 = pFail, p2 = pPass * pFailPA, p3 = pPass * pPayGivenPass, propPLEvalFail = avgPeakFail - trailingDD, hedgeEvalFail = -evalHedgeRatio * propPLEvalFail, hedgeEvalPass = -evalHedgeRatio * profitTarget, propPLPAFail = avgPeakFail - trailingDD, hedgePAFail = -paHedgeRatio * propPLPAFail, propPLPASuccess = payoutThreshold, hedgePASuccess = -paHedgeRatio * propPLPASuccess, eFric = friction * evalHedgeContracts, pFric = friction * paHedgeContracts, net1 = -evalCost + hedgeEvalFail - eFric, net2 = -evalCost - paCost + hedgeEvalPass - eFric + hedgePAFail - pFric, net3 = -evalCost - paCost + hedgeEvalPass - eFric + payoutAmt + hedgePASuccess - pFric, net1_nh = -evalCost, net2_nh = -evalCost - paCost, net3_nh = -evalCost - paCost + payoutAmt, ev = p1 * net1 + p2 * net2 + p3 * net3, evNH = p1 * net1_nh + p2 * net2_nh + p3 * net3_nh, ev2 = p1 * net1 ** 2 + p2 * net2 ** 2 + p3 * net3 ** 2, sd = Math.sqrt(Math.max(0, ev2 - ev ** 2)), ev2NH = p1 * net1_nh ** 2 + p2 * net2_nh ** 2 + p3 * net3_nh ** 2, sdNH = Math.sqrt(Math.max(0, ev2NH - evNH ** 2)), cyclesHedge = sd > 0 && ev > 0 ? Math.ceil((1.645 * sd / ev) ** 2) : ev > 0 ? 1 : 1 / 0, cyclesNH = sdNH > 0 && evNH > 0 ? Math.ceil((1.645 * sdNH / evNH) ** 2) : evNH > 0 ? 1 : 1 / 0;
      return {
        p1,
        p2,
        p3,
        propPLEvalFail,
        hedgeEvalFail,
        hedgeEvalPass,
        propPLPAFail,
        hedgePAFail,
        propPLPASuccess,
        hedgePASuccess,
        net1,
        net2,
        net3,
        net1_nh,
        net2_nh,
        net3_nh,
        ev,
        evNH,
        sd,
        sdNH,
        cyclesHedge,
        cyclesNH,
        hedgeOnlyEV: ev - evNH,
        payoutThreshold,
        eFric,
        pFric
      };
    }, [
      passRate,
      payoutRate,
      avgPeakFail,
      friction,
      evalHedgeContracts,
      paHedgeContracts,
      evalCost,
      paCost,
      profitTarget,
      trailingDD,
      payoutAmt,
      payoutThreshold,
      evalHedgeRatio,
      paHedgeRatio
    ]), r1 = useMemo(() => {
      const pPay = stfPayoutRate / 100, pFail = 1 - pPay, propPLFail = avgPeakFail - trailingDD, hedgeFail = -stfHedgeRatio * propPLFail, propPLSuccess = payoutThreshold, hedgeSuccess = -stfHedgeRatio * propPLSuccess, hFric = friction * stfHedgeContracts, netFail = -stfCost + hedgeFail - hFric, netSuccess = -stfCost + payoutAmt + hedgeSuccess - hFric, netFail_nh = -stfCost, netSuccess_nh = -stfCost + payoutAmt, ev = pFail * netFail + pPay * netSuccess, evNH = pFail * netFail_nh + pPay * netSuccess_nh, ev2 = pFail * netFail ** 2 + pPay * netSuccess ** 2, sd = Math.sqrt(Math.max(0, ev2 - ev ** 2)), ev2NH = pFail * netFail_nh ** 2 + pPay * netSuccess_nh ** 2, sdNH = Math.sqrt(Math.max(0, ev2NH - evNH ** 2)), cyclesHedge = sd > 0 && ev > 0 ? Math.ceil((1.645 * sd / ev) ** 2) : ev > 0 ? 1 : 1 / 0, cyclesNH = sdNH > 0 && evNH > 0 ? Math.ceil((1.645 * sdNH / evNH) ** 2) : evNH > 0 ? 1 : 1 / 0;
      return {
        pFail,
        pPay,
        propPLFail,
        hedgeFail,
        propPLSuccess,
        hedgeSuccess,
        netFail,
        netSuccess,
        netFail_nh,
        netSuccess_nh,
        ev,
        evNH,
        sd,
        sdNH,
        cyclesHedge,
        cyclesNH,
        hedgeOnlyEV: ev - evNH,
        hFric
      };
    }, [stfPayoutRate, avgPeakFail, friction, stfHedgeContracts, stfCost, payoutAmt, payoutThreshold, stfHedgeRatio, trailingDD]), is2Step = accountType === "2-step", r = is2Step ? r2 : r1, capital = useMemo(() => {
      if (is2Step) {
        const worstEvalLoss = Math.abs(r2.hedgeEvalPass), worstPALoss = Math.abs(r2.hedgePASuccess), totalFriction = r2.eFric + r2.pFric, worstCaseLoss = worstEvalLoss + worstPALoss + totalFriction, maxContracts = Math.max(evalHedgeContracts, paHedgeContracts), intradayMargin = maxContracts * inst.intradayMargin, overnightMargin = maxContracts * inst.initialMargin, minIntraday = intradayMargin + worstCaseLoss, minOvernight = overnightMargin + worstCaseLoss, bufferPct = 0.25, recIntraday = Math.ceil(minIntraday * (1 + bufferPct)), recOvernight = Math.ceil(minOvernight * (1 + bufferPct));
        return {
          worstEvalLoss,
          worstPALoss,
          totalFriction,
          worstCaseLoss,
          maxContracts,
          intradayMargin,
          overnightMargin,
          minIntraday,
          minOvernight,
          recIntraday,
          recOvernight
        };
      } else {
        const worstLoss = Math.abs(r1.hedgeSuccess), totalFriction = r1.hFric, worstCaseLoss = worstLoss + totalFriction, intradayMargin = stfHedgeContracts * inst.intradayMargin, overnightMargin = stfHedgeContracts * inst.initialMargin, minIntraday = intradayMargin + worstCaseLoss, minOvernight = overnightMargin + worstCaseLoss, bufferPct = 0.25, recIntraday = Math.ceil(minIntraday * (1 + bufferPct)), recOvernight = Math.ceil(minOvernight * (1 + bufferPct));
        return {
          worstLoss,
          totalFriction,
          worstCaseLoss,
          maxContracts: stfHedgeContracts,
          intradayMargin,
          overnightMargin,
          minIntraday,
          minOvernight,
          recIntraday,
          recOvernight
        };
      }
    }, [is2Step, r2, r1, evalHedgeContracts, paHedgeContracts, stfHedgeContracts, inst]);
    return /* @__PURE__ */ React.createElement("div", { style: {
      background: C.bg,
      color: C.text,
      minHeight: "100vh",
      fontFamily: sansFont,
      padding: "24px 20px",
      maxWidth: 860,
      margin: "0 auto"
    } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24, borderBottom: `1px solid ${C.border}`, paddingBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("img", { src: TB_LOGO, alt: "TradeBlade", style: {
      width: 38,
      height: 38,
      objectFit: "contain",
      filter: `brightness(1.4) drop-shadow(0 0 10px ${C.cyan}55)`
    } }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: font,
      fontSize: 15,
      fontWeight: 800,
      color: C.text,
      letterSpacing: 1.5
    } }, /* @__PURE__ */ React.createElement("span", { style: { color: C.cyan } }, "TRADE"), /* @__PURE__ */ React.createElement("span", { style: { color: C.text } }, "BLADE")), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: font,
      fontSize: 9,
      color: C.faint,
      letterSpacing: 2.5,
      textTransform: "uppercase",
      marginTop: -1
    } }, "HEDGE EXECUTION SYSTEM"))), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: font,
      fontSize: 11,
      color: C.blue,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 4
    } }, "EXPECTED VALUE ANALYSIS"), /* @__PURE__ */ React.createElement("h1", { style: {
      fontFamily: sansFont,
      fontSize: 22,
      fontWeight: 800,
      color: C.text,
      margin: "4px 0 8px"
    } }, /* @__PURE__ */ React.createElement("span", { style: { color: C.cyan } }, "TradeBlade"), " Prop/Hedge Cycle Economics"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: C.dim, margin: "0 0 14px", lineHeight: 1.5 } }, "TradeBlade PropPrimary trades 1 ", inst.full, " (", inst.name, ") on ", is2Step ? "a 2-step eval" : "a straight-to-funded", " account. TradeBlade LiveHedge mirrors opposite with", " ", /* @__PURE__ */ React.createElement("span", { style: { color: C.cyan, fontWeight: 600 } }, is2Step ? `${evalHedgeContracts}/${paHedgeContracts} ${inst.micro}` : `${stfHedgeContracts} ${inst.micro}`), " ", "on a personal account.", is2Step ? " Eval losses are simulated; hedge gains are real \u2014 this asymmetry is the engine." : " Funded account losses are the prop's capital; hedge gains are real."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement(
      Dropdown,
      {
        label: "Instrument",
        value: instrument,
        onChange: handleInstrumentChange,
        options: Object.keys(INSTRUMENTS).map((k) => ({
          value: k,
          label: `${k} \u2014 ${INSTRUMENTS[k].name}`
        }))
      }
    ), /* @__PURE__ */ React.createElement(
      Toggle,
      {
        value: accountType,
        onChange: setAccountType,
        accent: C.blue,
        options: [
          { value: "2-step", label: "2-Step Eval" },
          { value: "straight-to-funded", label: "Straight to Funded" }
        ]
      }
    ))), /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      marginBottom: 20,
      display: "flex",
      flexWrap: "wrap",
      gap: "8px 20px",
      alignItems: "center"
    } }, /* @__PURE__ */ React.createElement("img", { src: TB_LOGO, alt: "TB", style: {
      width: 22,
      height: 22,
      objectFit: "contain",
      filter: "brightness(1.4)"
    } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: C.faint, fontFamily: sansFont } }, "PROP"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.text, fontFamily: font, fontWeight: 600 } }, "1 ", inst.full, " \xB7 $", inst.fullTickVal.toFixed(2), "/tick")), /* @__PURE__ */ React.createElement("div", { style: { width: 1, height: 14, background: C.border } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: C.faint, fontFamily: sansFont } }, "HEDGE"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.cyan, fontFamily: font, fontWeight: 600 } }, is2Step ? `${evalHedgeContracts}\u2192${paHedgeContracts} ${inst.micro} \xB7 $${evalHedgeTickVal}\u2192$${paHedgeTickVal}/tick` : `${stfHedgeContracts} ${inst.micro} \xB7 $${stfHedgeTickVal}/tick`)), /* @__PURE__ */ React.createElement("div", { style: { width: 1, height: 14, background: C.border } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: C.faint, fontFamily: sansFont } }, "RATIO"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.amber, fontFamily: font, fontWeight: 600 } }, is2Step ? `${(evalHedgeRatio * 100).toFixed(0)}% eval / ${(paHedgeRatio * 100).toFixed(0)}% PA` : `${(stfHedgeRatio * 100).toFixed(0)}%`)), /* @__PURE__ */ React.createElement("div", { style: { width: 1, height: 14, background: C.border } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: C.faint, fontFamily: sansFont } }, "NT COMM"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: C.dim, fontFamily: font } }, "$", NT_MICRO_RT.free.toFixed(2), "/RT (Free) \xB7 $", NT_MICRO_RT.lifetime.toFixed(2), "/RT (Lifetime)"))), /* @__PURE__ */ React.createElement(Section, { title: "Account Configuration", icon: "\u{1F4B2}", accent: C.amber }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      padding: 16,
      borderRadius: 8,
      border: `1px solid ${C.border}`,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0 24px"
    } }, is2Step ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Eval Cost",
        value: evalCost,
        onChange: setEvalCost,
        min: 15,
        max: 300,
        step: 5,
        fmt: (v) => `$${v}`,
        sub: "Apex 50k: $40 \xB7 Topstep 50k: $49 \xB7 FTMO: $155"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "PA Activation / Monthly",
        value: paCost,
        onChange: setPaCost,
        min: 0,
        max: 300,
        step: 5,
        fmt: (v) => `$${v}`,
        sub: "Monthly fee once funded (Apex: $85)"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Eval Profit Target",
        value: profitTarget,
        onChange: setProfitTarget,
        min: 1e3,
        max: 1e4,
        step: 100,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: "Must hit to pass eval (Apex 50k: $3,000)"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Trailing Drawdown",
        value: trailingDD,
        onChange: setTrailingDD,
        min: 1e3,
        max: 5e3,
        step: 100,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: "Account killed when DD breached (Apex 50k: $2,500)"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Payout Amount",
        value: payoutAmt,
        onChange: setPayoutAmt,
        min: 500,
        max: 1e4,
        step: 100,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: "Cash received per successful payout cycle"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Amount Needed to Reach Payout",
        value: payoutThreshold,
        onChange: setPayoutThreshold,
        min: 1e3,
        max: 15e3,
        step: 100,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: "Total funded P/L to unlock payout (25k: ~$1,500 \xB7 50k: ~$2,600 \xB7 150k: ~$5,000 \xB7 300k: ~$9,000)"
      }
    )) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Account Cost",
        value: stfCost,
        onChange: setStfCost,
        min: 25,
        max: 500,
        step: 5,
        fmt: (v) => `$${v}`,
        sub: "One-time fee for funded account access"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Payout Amount",
        value: payoutAmt,
        onChange: setPayoutAmt,
        min: 500,
        max: 1e4,
        step: 100,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: "Cash received per successful payout"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Profit Target",
        value: profitTarget,
        onChange: setProfitTarget,
        min: 1e3,
        max: 1e4,
        step: 100,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: "Target to reach payout eligibility"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Trailing Drawdown",
        value: trailingDD,
        onChange: setTrailingDD,
        min: 1e3,
        max: 5e3,
        step: 100,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: "Account killed when DD breached"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Amount Needed to Reach Payout",
        value: payoutThreshold,
        onChange: setPayoutThreshold,
        min: 1e3,
        max: 15e3,
        step: 100,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: "Total funded P/L to unlock payout (25k: ~$1,500 \xB7 50k: ~$2,600 \xB7 150k: ~$5,000 \xB7 300k: ~$9,000)"
      }
    ), /* @__PURE__ */ React.createElement("div", null), " "))), /* @__PURE__ */ React.createElement(Section, { title: "Model Assumptions (Adjustable)", icon: "\u2699\uFE0F", accent: C.purple }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      padding: 16,
      borderRadius: 8,
      border: `1px solid ${C.border}`,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0 24px"
    } }, is2Step ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Probability of Passing Eval",
        value: passRate,
        onChange: setPassRate,
        min: 1,
        max: 50,
        fmt: (v) => `${v}%`,
        sub: "Industry avg ~10% first attempt pass rate"
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Probability of Reaching Payout",
        value: payoutRate,
        onChange: setPayoutRate,
        min: 10,
        max: 80,
        fmt: (v) => `${v}%`,
        sub: "Of those who pass eval, % that reach a payout"
      }
    )) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Probability of Reaching Payout",
        value: stfPayoutRate,
        onChange: setStfPayoutRate,
        min: 1,
        max: 60,
        fmt: (v) => `${v}%`,
        sub: "Probability of reaching payout before blowing account"
      }
    ), /* @__PURE__ */ React.createElement("div", null), " "), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: "Profit Target Per Trade",
        value: avgPeakFail,
        onChange: setAvgPeakFail,
        min: 50,
        max: 2500,
        step: 50,
        fmt: (v) => `$${v.toLocaleString()}`,
        sub: `Expected P/L per trade attempt on the prop (e.g. ${avgPeakFail > 0 ? (avgPeakFail / inst.fullTickVal).toFixed(0) : 0} ${inst.full} ticks \xD7 $${inst.fullTickVal.toFixed(2)}/tick). This is the peak the account reaches before a reversal into loss.`
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: `Commission Costs / ${inst.micro} / Phase`,
        value: friction,
        onChange: setFriction,
        min: 0,
        max: 200,
        step: 5,
        fmt: (v) => `$${v}`,
        sub: `Min trades to failure: ~${avgPeakFail > 0 ? Math.ceil(trailingDD / avgPeakFail) : "\u221E"} trades (DD $${trailingDD.toLocaleString()} \xF7 $${avgPeakFail}/trade) \xD7 $${NT_MICRO_RT.free.toFixed(2)}/RT (NT Free) = ~$${avgPeakFail > 0 ? (Math.ceil(trailingDD / avgPeakFail) * NT_MICRO_RT.free).toFixed(0) : "\u2014"} min per ${inst.micro}`
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1 / -1", borderTop: `1px solid ${C.border}`, margin: "6px 0 10px" } }), is2Step ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Param,
      {
        label: `Eval Hedge (${inst.micro})`,
        value: evalHedgeContracts,
        onChange: setEvalHedgeContracts,
        min: 1,
        max: 10,
        fmt: (v) => `${v} ${inst.micro}`,
        sub: `= ${evalHedgeContracts * 10}% of 1 ${inst.full} \xB7 $${evalHedgeTickVal}/tick \xB7 $${(evalHedgeContracts * friction).toFixed(0)} commission`
      }
    ), /* @__PURE__ */ React.createElement(
      Param,
      {
        label: `PA Hedge (${inst.micro})`,
        value: paHedgeContracts,
        onChange: setPaHedgeContracts,
        min: 1,
        max: 10,
        fmt: (v) => `${v} ${inst.micro}`,
        sub: `= ${paHedgeContracts * 10}% of 1 ${inst.full} \xB7 $${paHedgeTickVal}/tick \xB7 $${(paHedgeContracts * friction).toFixed(0)} commission`
      }
    )) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Param,
      {
        label: `Hedge Contracts (${inst.micro})`,
        value: stfHedgeContracts,
        onChange: setStfHedgeContracts,
        min: 1,
        max: 10,
        fmt: (v) => `${v} ${inst.micro}`,
        sub: `= ${stfHedgeContracts * 10}% of 1 ${inst.full} \xB7 $${stfHedgeTickVal}/tick \xB7 $${(stfHedgeContracts * friction).toFixed(0)} commission`
      }
    ), /* @__PURE__ */ React.createElement("div", null), " "))), /* @__PURE__ */ React.createElement(Section, { title: is2Step ? "TradeBlade Sim/Real Asymmetry" : "TradeBlade Capital Asymmetry", icon: "\u{1F511}", accent: C.amber }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      padding: 16,
      borderRadius: 8,
      border: `1px solid ${C.border}`,
      fontSize: 12,
      lineHeight: 1.7,
      color: C.dim
    } }, is2Step ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 8px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.text } }, "During eval:"), " TradeBlade PropPrimary P/L is ", /* @__PURE__ */ React.createElement("span", { style: { color: C.amber, fontWeight: 600 } }, "simulated"), ". You risk only $", evalCost, ". But TradeBlade LiveHedge captures ", /* @__PURE__ */ React.createElement("span", { style: { color: C.green, fontWeight: 600 } }, "real gains"), " from those sim losses at ", /* @__PURE__ */ React.createElement("span", { style: { color: C.cyan, fontWeight: 600 } }, evalHedgeContracts, "/10 scale (", (evalHedgeRatio * 100).toFixed(0), "%)"), "."), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 8px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.green } }, "When PropPrimary fails (", (r2.p1 * 100).toFixed(0), "% of cycles):"), " Prop sim loss ~$", Math.abs(r2.propPLEvalFail).toLocaleString(), " \u2192 ", " LiveHedge real gain of ", /* @__PURE__ */ React.createElement("span", { style: { color: C.green, fontWeight: 700 } }, "+$", r2.hedgeEvalFail.toFixed(0)), " (", evalHedgeContracts, " ", inst.micro, "). You paid $", evalCost, " for the eval but recovered $", r2.hedgeEvalFail.toFixed(0), "."), /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.red } }, "When PropPrimary passes (", passRate, "%):"), " Prop sim win of $", profitTarget.toLocaleString(), " \u2192 ", " LiveHedge real loss of ", /* @__PURE__ */ React.createElement("span", { style: { color: C.red, fontWeight: 700 } }, "$", r2.hedgeEvalPass.toFixed(0)), " (", evalHedgeContracts, " ", inst.micro, "). But this unlocks the PA where real payouts live.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 8px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.text } }, "Straight-to-funded:"), " You risk only ", /* @__PURE__ */ React.createElement("span", { style: { color: C.amber, fontWeight: 600 } }, "$", stfCost), " (account fee). TradeBlade PropPrimary trades the firm's capital. TradeBlade LiveHedge captures ", /* @__PURE__ */ React.createElement("span", { style: { color: C.green, fontWeight: 600 } }, "real gains"), " from funded losses at ", /* @__PURE__ */ React.createElement("span", { style: { color: C.cyan, fontWeight: 600 } }, stfHedgeContracts, "/10 scale (", (stfHedgeRatio * 100).toFixed(0), "%)"), "."), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 8px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.green } }, "When PropPrimary blows (", (r1.pFail * 100).toFixed(0), "% of cycles):"), " Prop funded loss ~$", Math.abs(r1.propPLFail).toLocaleString(), " \u2192 ", " LiveHedge real gain of ", /* @__PURE__ */ React.createElement("span", { style: { color: C.green, fontWeight: 700 } }, "+$", r1.hedgeFail.toFixed(0)), " (", stfHedgeContracts, " ", inst.micro, ")."), /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.red } }, "When PropPrimary pays out (", stfPayoutRate, "%):"), " Prop funded gain of $", payoutThreshold.toLocaleString(), " \u2192 ", " LiveHedge real loss of ", /* @__PURE__ */ React.createElement("span", { style: { color: C.red, fontWeight: 700 } }, "$", r1.hedgeSuccess.toFixed(0)), " (", stfHedgeContracts, " ", inst.micro, "). But you receive the $", payoutAmt.toLocaleString(), " payout.")))), /* @__PURE__ */ React.createElement(Section, { title: is2Step ? "Three Outcome Scenarios" : "Two Outcome Scenarios", icon: "\u{1F3AF}", accent: C.blue }, is2Step ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      ScenarioCard,
      {
        title: "SCENARIO 1 \u2014 FAIL EVAL",
        prob: r2.p1,
        color: C.green,
        icon: "\u{1F4C9}",
        items: [
          { label: "Eval fee", val: -evalCost },
          { label: "Prop sim P/L (not real money)", val: r2.propPLEvalFail, fmt: `$${r2.propPLEvalFail.toLocaleString()} sim`, skip: !0 },
          { label: `Hedge real gain (${evalHedgeContracts} ${inst.micro} \xD7 1/10 of $${Math.abs(r2.propPLEvalFail).toLocaleString()})`, val: r2.hedgeEvalFail },
          { label: `Hedge commissions (${evalHedgeContracts}\xD7$${friction})`, val: -r2.eFric }
        ],
        net: r2.net1
      }
    ), /* @__PURE__ */ React.createElement(
      ScenarioCard,
      {
        title: "SCENARIO 2 \u2014 PASS EVAL, FAIL PA",
        prob: r2.p2,
        color: C.red,
        icon: "\u{1F480}",
        items: [
          { label: "Eval fee + PA activation", val: -(evalCost + paCost) },
          { label: `Hedge loss during eval (${evalHedgeContracts} ${inst.micro} vs $${profitTarget.toLocaleString()} sim target)`, val: r2.hedgeEvalPass },
          { label: `Hedge commissions \u2014 eval (${evalHedgeContracts}\xD7$${friction})`, val: -r2.eFric },
          { label: `Hedge gain during PA (${paHedgeContracts} ${inst.micro} \xD7 ~$${Math.abs(r2.propPLPAFail).toLocaleString()} loss)`, val: r2.hedgePAFail },
          { label: `Hedge commissions \u2014 PA (${paHedgeContracts}\xD7$${friction})`, val: -r2.pFric },
          { label: "Prop PA payout", val: 0 }
        ],
        net: r2.net2
      }
    ), /* @__PURE__ */ React.createElement(
      ScenarioCard,
      {
        title: `SCENARIO 3 \u2014 PASS EVAL, $${payoutAmt.toLocaleString()} PAYOUT`,
        prob: r2.p3,
        color: C.cyan,
        icon: "\u{1F4B0}",
        items: [
          { label: "Eval fee + PA activation", val: -(evalCost + paCost) },
          { label: `Hedge loss during eval (${evalHedgeContracts} ${inst.micro} vs $${profitTarget.toLocaleString()} sim target)`, val: r2.hedgeEvalPass },
          { label: `Hedge commissions \u2014 eval (${evalHedgeContracts}\xD7$${friction})`, val: -r2.eFric },
          { label: "Prop payout received (cash)", val: payoutAmt },
          { label: `Hedge loss during PA (${paHedgeContracts} ${inst.micro} \xD7 $${r2.propPLPASuccess.toLocaleString()} funded gain)`, val: r2.hedgePASuccess },
          { label: `Hedge commissions \u2014 PA (${paHedgeContracts}\xD7$${friction})`, val: -r2.pFric }
        ],
        net: r2.net3
      }
    ), /* @__PURE__ */ React.createElement("div", { style: {
      background: C.cardHi,
      border: `1px solid ${C.borderHi}`,
      borderRadius: 8,
      padding: 10,
      marginTop: 4,
      fontSize: 10,
      color: C.dim,
      lineHeight: 1.5
    } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.amber } }, "Scenario 3 note:"), " Prop accumulates +$", r2.propPLPASuccess.toLocaleString(), " funded gain to reach payout threshold. The $", payoutAmt.toLocaleString(), " payout comes from those accumulated gains \u2014 the hedge only runs against the $", r2.propPLPASuccess.toLocaleString(), " trading P/L, not payout on top of it. Remaining $", payoutThreshold - payoutAmt >= 0 ? (payoutThreshold - payoutAmt).toLocaleString() : 0, " stays in PA as buffer above locked floor.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      ScenarioCard,
      {
        title: "SCENARIO 1 \u2014 BLOW FUNDED ACCOUNT",
        prob: r1.pFail,
        color: C.green,
        icon: "\u{1F4C9}",
        items: [
          { label: "Account fee", val: -stfCost },
          { label: "Prop funded P/L (firm's capital)", val: r1.propPLFail, fmt: `$${r1.propPLFail.toLocaleString()} funded`, skip: !0 },
          { label: `Hedge real gain (${stfHedgeContracts} ${inst.micro} \xD7 1/10 of $${Math.abs(r1.propPLFail).toLocaleString()})`, val: r1.hedgeFail },
          { label: `Hedge commissions (${stfHedgeContracts}\xD7$${friction})`, val: -r1.hFric }
        ],
        net: r1.netFail
      }
    ), /* @__PURE__ */ React.createElement(
      ScenarioCard,
      {
        title: `SCENARIO 2 \u2014 $${payoutAmt.toLocaleString()} PAYOUT`,
        prob: r1.pPay,
        color: C.cyan,
        icon: "\u{1F4B0}",
        items: [
          { label: "Account fee", val: -stfCost },
          { label: "Prop payout received (cash)", val: payoutAmt },
          { label: `Hedge loss (${stfHedgeContracts} ${inst.micro} \xD7 $${payoutThreshold.toLocaleString()} funded gain)`, val: r1.hedgeSuccess },
          { label: `Hedge commissions (${stfHedgeContracts}\xD7$${friction})`, val: -r1.hFric }
        ],
        net: r1.netSuccess
      }
    ))), /* @__PURE__ */ React.createElement(Section, { title: "TradeBlade Expected Value Per Cycle", icon: "\u{1F4CA}", accent: C.green }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 } }, /* @__PURE__ */ React.createElement(
      MetricBox,
      {
        label: "EV WITH HEDGE",
        value: `${r.ev >= 0 ? "+" : ""}$${r.ev.toFixed(2)}`,
        color: r.ev >= 0 ? C.green : C.red,
        sub: `Standard dev: $${r.sd.toFixed(0)}`
      }
    ), /* @__PURE__ */ React.createElement(
      MetricBox,
      {
        label: "EV WITHOUT HEDGE",
        value: `${r.evNH >= 0 ? "+" : ""}$${r.evNH.toFixed(2)}`,
        color: r.evNH >= 0 ? C.green : C.red,
        sub: `Standard dev: $${r.sdNH.toFixed(0)}`
      }
    ), /* @__PURE__ */ React.createElement(
      MetricBox,
      {
        label: "HEDGE VALUE-ADD",
        value: `${r.hedgeOnlyEV >= 0 ? "+" : ""}$${r.hedgeOnlyEV.toFixed(2)}`,
        color: r.hedgeOnlyEV >= 0 ? C.green : C.red,
        sub: "Per cycle EV difference"
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
      MetricBox,
      {
        label: "95% PROFIT CONFIDENCE (HEDGE)",
        value: r.cyclesHedge === 1 / 0 ? "N/A" : `${r.cyclesHedge} cycles`,
        color: C.cyan,
        sub: r.cyclesHedge < 1 / 0 ? `~${r.cyclesHedge} eval attempts needed` : "Negative EV"
      }
    ), /* @__PURE__ */ React.createElement(
      MetricBox,
      {
        label: "95% PROFIT CONFIDENCE (NO HEDGE)",
        value: r.cyclesNH === 1 / 0 ? "N/A" : `${r.cyclesNH} cycles`,
        color: C.orange,
        sub: r.cyclesNH < 1 / 0 ? `~${r.cyclesNH} eval attempts needed` : "Negative EV"
      }
    ), /* @__PURE__ */ React.createElement(
      MetricBox,
      {
        label: "VARIANCE REDUCTION",
        value: r.sdNH > 0 ? `${((1 - r.sd / r.sdNH) * 100).toFixed(0)}%` : "N/A",
        color: C.purple,
        sub: "Lower variance = smoother P&L"
      }
    ))), /* @__PURE__ */ React.createElement(Section, { title: `TradeBlade Live Account Capital \xB7 ${inst.micro}`, icon: "\u{1F3E6}", accent: C.green }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "16px 18px",
      marginBottom: 12
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: sansFont,
      fontSize: 12,
      fontWeight: 700,
      color: C.amber,
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 6
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, "\u26A0\uFE0F"), "Worst-Case Scenario (Prop Succeeds All Phases)"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: C.dim, fontFamily: sansFont, marginBottom: 10, lineHeight: 1.5 } }, "The hedge account's worst case is when the prop ", /* @__PURE__ */ React.createElement("strong", { style: { color: C.text } }, "succeeds"), " \u2014 LiveHedge loses money on every phase where PropPrimary profits. This is the max drawdown your live account must survive."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 3, marginBottom: 10 } }, is2Step ? /* @__PURE__ */ React.createElement(React.Fragment, null, [
      { label: `Eval phase hedge loss (${evalHedgeContracts} ${inst.micro} \xD7 ${(evalHedgeRatio * 100).toFixed(0)}% of $${profitTarget.toLocaleString()} target)`, val: -capital.worstEvalLoss },
      { label: `PA phase hedge loss (${paHedgeContracts} ${inst.micro} \xD7 ${(paHedgeRatio * 100).toFixed(0)}% of $${payoutThreshold.toLocaleString()} payout threshold)`, val: -capital.worstPALoss },
      { label: `Total commissions (eval: $${r2.eFric} + PA: $${r2.pFric})`, val: -capital.totalFriction }
    ].map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 0",
      borderBottom: `1px solid ${C.border}22`
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, color: C.dim } }, item.label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 11, fontWeight: 500, color: C.red } }, "$", item.val.toFixed(0))))) : /* @__PURE__ */ React.createElement(React.Fragment, null, [
      { label: `Funded phase hedge loss (${stfHedgeContracts} ${inst.micro} \xD7 ${(stfHedgeRatio * 100).toFixed(0)}% of $${payoutThreshold.toLocaleString()} payout threshold)`, val: -capital.worstLoss },
      { label: `Total commissions (${stfHedgeContracts}\xD7$${friction})`, val: -capital.totalFriction }
    ].map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 0",
      borderBottom: `1px solid ${C.border}22`
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, color: C.dim } }, item.label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 11, fontWeight: 500, color: C.red } }, "$", item.val.toFixed(0))))), /* @__PURE__ */ React.createElement("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "6px 0",
      borderTop: `1px solid ${C.border}`
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, fontWeight: 700, color: C.text } }, "Total Worst-Case Hedge Loss"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 14, fontWeight: 800, color: C.red } }, "-$", capital.worstCaseLoss.toFixed(0))))), /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "16px 18px",
      marginBottom: 12
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: sansFont,
      fontSize: 12,
      fontWeight: 700,
      color: C.cyan,
      marginBottom: 10
    } }, "NinjaTrader ", inst.micro, " Margin Requirements"), /* @__PURE__ */ React.createElement("div", { style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginBottom: 10
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.cardHi,
      borderRadius: 8,
      padding: "10px 12px",
      textAlign: "center"
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: sansFont, fontSize: 9, color: C.faint, textTransform: "uppercase", letterSpacing: 1 } }, "Intraday Margin"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: C.green, marginTop: 4 } }, "$", inst.intradayMargin.toLocaleString(), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: C.dim } }, "/contract")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: font, fontSize: 11, color: C.text, marginTop: 2 } }, "\xD7 ", capital.maxContracts, " = $", capital.intradayMargin.toLocaleString())), /* @__PURE__ */ React.createElement("div", { style: {
      background: C.cardHi,
      borderRadius: 8,
      padding: "10px 12px",
      textAlign: "center"
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: sansFont, fontSize: 9, color: C.faint, textTransform: "uppercase", letterSpacing: 1 } }, "Overnight / Exchange"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: font, fontSize: 14, fontWeight: 700, color: C.amber, marginTop: 4 } }, "$", inst.initialMargin.toLocaleString(), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: C.dim } }, "/contract")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: font, fontSize: 11, color: C.text, marginTop: 2 } }, "\xD7 ", capital.maxContracts, " = $", capital.overnightMargin.toLocaleString()))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.faint, fontFamily: sansFont, lineHeight: 1.5 } }, "Intraday margin applies during regular trading hours with NinjaTrader. Overnight/exchange margin required for positions held past session close. Maintenance margin: $", inst.maintenanceMargin.toLocaleString(), "/contract. Margins subject to change during high volatility.")), /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "16px 18px"
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: sansFont,
      fontSize: 12,
      fontWeight: 700,
      color: C.text,
      marginBottom: 12
    } }, "Total Live Account Capital Needed"), /* @__PURE__ */ React.createElement("div", { style: {
      background: C.cardHi,
      borderRadius: 8,
      padding: "12px 14px",
      marginBottom: 8,
      borderLeft: `3px solid ${C.green}`
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: sansFont, fontSize: 11, fontWeight: 600, color: C.green, marginBottom: 6 } }, "INTRADAY ONLY (close all positions before session end)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 2 } }, [
      { label: `Intraday margin (${capital.maxContracts} \xD7 $${inst.intradayMargin.toLocaleString()})`, val: `$${capital.intradayMargin.toLocaleString()}` },
      { label: "Worst-case hedge loss", val: `$${capital.worstCaseLoss.toFixed(0)}` }
    ].map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", padding: "2px 0" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, color: C.dim } }, item.label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 11, color: C.text } }, item.val)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 6, marginTop: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, color: C.dim } }, "Minimum"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: C.text } }, "$", capital.minIntraday.toFixed(0))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, fontWeight: 700, color: C.green } }, "Recommended (+25% buffer)"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 15, fontWeight: 800, color: C.green } }, "$", capital.recIntraday.toLocaleString()))), /* @__PURE__ */ React.createElement("div", { style: {
      background: C.cardHi,
      borderRadius: 8,
      padding: "12px 14px",
      borderLeft: `3px solid ${C.amber}`
    } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: sansFont, fontSize: 11, fontWeight: 600, color: C.amber, marginBottom: 6 } }, "OVERNIGHT CAPABLE (hold positions through session close)"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 2 } }, [
      { label: `Exchange margin (${capital.maxContracts} \xD7 $${inst.initialMargin.toLocaleString()})`, val: `$${capital.overnightMargin.toLocaleString()}` },
      { label: "Worst-case hedge loss", val: `$${capital.worstCaseLoss.toFixed(0)}` }
    ].map((item, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", justifyContent: "space-between", padding: "2px 0" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, color: C.dim } }, item.label), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 11, color: C.text } }, item.val)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 6, marginTop: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, color: C.dim } }, "Minimum"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 13, fontWeight: 700, color: C.text } }, "$", capital.minOvernight.toFixed(0))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: sansFont, fontSize: 11, fontWeight: 700, color: C.amber } }, "Recommended (+25% buffer)"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 15, fontWeight: 800, color: C.amber } }, "$", capital.recOvernight.toLocaleString()))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: C.faint, fontFamily: sansFont, lineHeight: 1.5, marginTop: 10 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.dim } }, "How to read this:"), " Margin is required by NinjaTrader to hold ", inst.micro, " positions. Worst-case loss is the max your hedge account can lose in a single cycle when the prop succeeds through ", is2Step ? "both eval and PA phases" : "to payout", ". The 25% buffer protects against margin calls from intra-trade drawdowns before the prop's final outcome.", is2Step ? ` Phases are sequential (eval then PA), so margin is based on the max concurrent contracts: ${capital.maxContracts} ${inst.micro}.` : ""))), /* @__PURE__ */ React.createElement(Section, { title: "Side-by-Side Comparison", icon: "\u2696\uFE0F", accent: C.cyan }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      overflow: "hidden"
    } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontFamily: font, fontSize: 11 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: C.cardHi } }, /* @__PURE__ */ React.createElement("th", { style: { textAlign: "left", padding: "8px 12px", color: C.dim, fontWeight: 500, fontFamily: sansFont } }, "Scenario"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "center", padding: "8px 12px", color: C.dim, fontWeight: 500, fontFamily: sansFont } }, "Prob"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right", padding: "8px 12px", color: C.blue, fontWeight: 600, fontFamily: sansFont } }, "With Hedge"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right", padding: "8px 12px", color: C.orange, fontWeight: 600, fontFamily: sansFont } }, "No Hedge"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right", padding: "8px 12px", color: C.purple, fontWeight: 600, fontFamily: sansFont } }, "Delta"))), /* @__PURE__ */ React.createElement("tbody", null, is2Step ? [
      ["Fail Eval", r2.p1, r2.net1, r2.net1_nh],
      ["Pass / Fail PA", r2.p2, r2.net2, r2.net2_nh],
      [`Pass / $${(payoutAmt / 1e3).toFixed(0)}k Payout`, r2.p3, r2.net3, r2.net3_nh]
    ].map(([name, prob, wh, nh], i) => /* @__PURE__ */ React.createElement("tr", { key: i, style: { borderTop: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", color: C.text, fontFamily: sansFont, fontSize: 12 } }, name), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "center", color: C.dim } }, (prob * 100).toFixed(0), "%"), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: wh >= 0 ? C.green : C.red, fontWeight: 600 } }, wh >= 0 ? "+" : "", "$", wh.toFixed(0)), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: nh >= 0 ? C.green : C.red, fontWeight: 600 } }, nh >= 0 ? "+" : "", "$", nh.toFixed(0)), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: wh - nh >= 0 ? C.green : C.red } }, wh - nh >= 0 ? "+" : "", "$", (wh - nh).toFixed(0)))) : [
      ["Blow Account", r1.pFail, r1.netFail, r1.netFail_nh],
      [`$${(payoutAmt / 1e3).toFixed(0)}k Payout`, r1.pPay, r1.netSuccess, r1.netSuccess_nh]
    ].map(([name, prob, wh, nh], i) => /* @__PURE__ */ React.createElement("tr", { key: i, style: { borderTop: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", color: C.text, fontFamily: sansFont, fontSize: 12 } }, name), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "center", color: C.dim } }, (prob * 100).toFixed(0), "%"), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: wh >= 0 ? C.green : C.red, fontWeight: 600 } }, wh >= 0 ? "+" : "", "$", wh.toFixed(0)), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: nh >= 0 ? C.green : C.red, fontWeight: 600 } }, nh >= 0 ? "+" : "", "$", nh.toFixed(0)), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: wh - nh >= 0 ? C.green : C.red } }, wh - nh >= 0 ? "+" : "", "$", (wh - nh).toFixed(0)))), /* @__PURE__ */ React.createElement("tr", { style: { borderTop: `2px solid ${C.borderHi}`, background: C.cardHi } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", color: C.text, fontWeight: 700, fontFamily: sansFont, fontSize: 12 } }, "Weighted EV"), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "center", color: C.dim, fontFamily: sansFont, fontSize: 11 } }, "100%"), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", color: r.ev >= 0 ? C.green : C.red, fontWeight: 800, fontSize: 13 } }, r.ev >= 0 ? "+" : "", "$", r.ev.toFixed(2)), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", color: r.evNH >= 0 ? C.green : C.red, fontWeight: 800, fontSize: 13 } }, r.evNH >= 0 ? "+" : "", "$", r.evNH.toFixed(2)), /* @__PURE__ */ React.createElement("td", { style: { padding: "10px 12px", textAlign: "right", color: r.hedgeOnlyEV >= 0 ? C.green : C.red, fontWeight: 800, fontSize: 13 } }, r.hedgeOnlyEV >= 0 ? "+" : "", "$", r.hedgeOnlyEV.toFixed(2))))))), /* @__PURE__ */ React.createElement(Section, { title: "TradeBlade Strategic Analysis", icon: "\u{1F9E0}", accent: C.amber }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: 16,
      fontSize: 12,
      color: C.dim,
      lineHeight: 1.7
    } }, is2Step ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 10px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.green } }, "The sim/real asymmetry is TradeBlade's edge."), " During eval, TradeBlade PropPrimary trades sim capital \u2014 failures cost only $", evalCost, ". But TradeBlade LiveHedge captures real gains from those sim failures. With ", evalHedgeContracts, " ", inst.micro, " during eval (", (evalHedgeRatio * 100).toFixed(0), "% ratio) and a ", passRate, "% pass rate,", /* @__PURE__ */ React.createElement("strong", { style: { color: C.text } }, " ", (r2.p1 * 100).toFixed(0), "% of cycles generate hedge profits averaging +$", r2.hedgeEvalFail.toFixed(0)), ", turning the most common outcome (eval failure) from a -$", evalCost, " loss into a ", r2.net1 >= 0 ? `+$${r2.net1.toFixed(0)} gain` : `$${r2.net1.toFixed(0)} loss`, "."), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 10px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.cyan } }, "LiveHedge scales up in PA:"), " Switching to ", paHedgeContracts, " ", inst.micro, " during PA (", (paHedgeRatio * 100).toFixed(0), "% ratio) amplifies both the recovery on PA failures and the drag on PA successes. The hedge runs against the $", r2.propPLPASuccess.toLocaleString(), " funded gain needed to reach payout threshold \u2014 the $", payoutAmt.toLocaleString(), " payout comes from those gains, not on top of them."), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 10px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.cyan } }, "Variance reduction is the real story."), " TradeBlade cuts standard deviation from $", r2.sdNH.toFixed(0), " to $", r2.sd.toFixed(0), " per cycle (", r2.sdNH > 0 ? ((1 - r2.sd / r2.sdNH) * 100).toFixed(0) : 0, "% reduction). You reach 95% confidence of profitability in ", /* @__PURE__ */ React.createElement("strong", { style: { color: C.text } }, r2.cyclesHedge === 1 / 0 ? "N/A" : r2.cyclesHedge, " cycles"), " vs ", r2.cyclesNH === 1 / 0 ? "N/A" : r2.cyclesNH, " without the TradeBlade system."), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 10px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.amber } }, "The trade-off:"), " When PropPrimary succeeds, LiveHedge costs you. Scenario 3 nets +$", r2.net3.toFixed(0), " with TradeBlade vs +$", r2.net3_nh.toFixed(0), " without \u2014 $", Math.abs(r2.net3 - r2.net3_nh).toFixed(0), " less upside. But success is rare (", (r2.p3 * 100).toFixed(0), "%) and TradeBlade makes the dominant failure path profitable."), /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.purple } }, "Capital needed:"), " LiveHedge account requires", " ", /* @__PURE__ */ React.createElement("strong", { style: { color: C.green } }, "$", capital.recIntraday.toLocaleString()), " (intraday) to", " ", /* @__PURE__ */ React.createElement("strong", { style: { color: C.amber } }, "$", capital.recOvernight.toLocaleString()), " (overnight)", " ", "with recommended 25% buffer \u2014 see the Live Account Capital breakdown above for the full worst-case math.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 10px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.green } }, "The capital asymmetry is TradeBlade's edge."), " You risk only $", stfCost, " (account fee) on the prop's capital. TradeBlade LiveHedge captures real gains when the prop blows. With ", stfHedgeContracts, " ", inst.micro, " (", (stfHedgeRatio * 100).toFixed(0), "% ratio) and a ", (r1.pFail * 100).toFixed(0), "% failure rate,", /* @__PURE__ */ React.createElement("strong", { style: { color: C.text } }, " the dominant outcome generates hedge profits averaging +$", r1.hedgeFail.toFixed(0)), ", turning account blowups from a -$", stfCost, " loss into a ", r1.netFail >= 0 ? `+$${r1.netFail.toFixed(0)} gain` : `$${r1.netFail.toFixed(0)} loss`, "."), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 10px" } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.cyan } }, "Simpler model, cleaner edge."), " No eval phase means no sim/real transition \u2014 TradeBlade LiveHedge runs against funded P/L from day one. Variance reduction: ", r1.sdNH > 0 ? ((1 - r1.sd / r1.sdNH) * 100).toFixed(0) : 0, "%. You reach 95% confidence in ", /* @__PURE__ */ React.createElement("strong", { style: { color: C.text } }, r1.cyclesHedge === 1 / 0 ? "N/A" : r1.cyclesHedge, " cycles"), " vs ", r1.cyclesNH === 1 / 0 ? "N/A" : r1.cyclesNH, " without the TradeBlade system."), /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: C.amber } }, "The trade-off:"), " When PropPrimary succeeds (", stfPayoutRate, "%), LiveHedge drags payout from +$", r1.netSuccess_nh.toFixed(0), " to +$", r1.netSuccess.toFixed(0), " ($", Math.abs(r1.netSuccess - r1.netSuccess_nh).toFixed(0), " less). But failure is the dominant path and TradeBlade monetizes it.")))), /* @__PURE__ */ React.createElement(Section, { title: `TradeBlade \xB7 NinjaTrader ${inst.micro} Commissions`, icon: "\u{1F4CB}", accent: C.faint }, /* @__PURE__ */ React.createElement("div", { style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      overflow: "hidden"
    } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontFamily: font, fontSize: 11 } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: C.cardHi } }, /* @__PURE__ */ React.createElement("th", { style: { textAlign: "left", padding: "8px 12px", color: C.dim, fontWeight: 500, fontFamily: sansFont } }, "Plan"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right", padding: "8px 12px", color: C.dim, fontWeight: 500, fontFamily: sansFont } }, "Per Side"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right", padding: "8px 12px", color: C.dim, fontWeight: 500, fontFamily: sansFont } }, "Round Trip"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right", padding: "8px 12px", color: C.dim, fontWeight: 500, fontFamily: sansFont } }, "Est. 25 RTs/Phase"))), /* @__PURE__ */ React.createElement("tbody", null, [
      ["Lifetime", NT_MICRO_COMMISSION.lifetime, NT_MICRO_RT.lifetime],
      ["Monthly ($99/mo)", NT_MICRO_COMMISSION.monthly, NT_MICRO_RT.monthly],
      ["Free", NT_MICRO_COMMISSION.free, NT_MICRO_RT.free]
    ].map(([plan, ps, rt], i) => /* @__PURE__ */ React.createElement("tr", { key: i, style: { borderTop: `1px solid ${C.border}` } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", color: C.text, fontFamily: sansFont, fontSize: 12 } }, plan), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: C.dim } }, "$", ps.toFixed(2)), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: C.cyan } }, "$", rt.toFixed(2)), /* @__PURE__ */ React.createElement("td", { style: { padding: "8px 12px", textAlign: "right", color: C.amber } }, "$", (rt * 25).toFixed(0)))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 12px", fontSize: 10, color: C.faint, borderTop: `1px solid ${C.border}` } }, "All micro equity index futures (MES, MNQ, MYM, M2K) share the same commission structure. Exchange: $0.37 + NFA: $0.19 + NT fee varies by plan. Updated 11/13/2025. Commission costs slider covers round-trip commissions for the hedge. Increase if you expect additional slippage."))), /* @__PURE__ */ React.createElement("div", { style: {
      textAlign: "center",
      padding: "16px 0 12px",
      fontSize: 10,
      color: C.faint,
      borderTop: `1px solid ${C.border}`,
      marginTop: 8,
      lineHeight: 1.5
    } }, /* @__PURE__ */ React.createElement("div", { style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8
    } }, /* @__PURE__ */ React.createElement("img", { src: TB_LOGO, alt: "TB", style: {
      width: 20,
      height: 20,
      objectFit: "contain",
      filter: "brightness(1.4)"
    } }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 11, fontWeight: 700, letterSpacing: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { color: C.cyan } }, "TRADE"), /* @__PURE__ */ React.createElement("span", { style: { color: C.dim } }, "BLADE")), /* @__PURE__ */ React.createElement("span", { style: { color: C.faint, fontSize: 9 } }, "\xB7"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: font, fontSize: 9, color: C.faint, letterSpacing: 1.5 } }, "HEDGE EXECUTION SYSTEM")), /* @__PURE__ */ React.createElement("br", null), inst.full, "/", inst.micro, " (", inst.name, ") \xB7 ", inst.full, ": $", inst.fullTickVal.toFixed(2), "/tick \xB7 ", inst.micro, ": $", inst.microTickVal.toFixed(2), "/tick \xB7 Ratio: 1 ", inst.micro, " = 1/10 ", inst.full, /* @__PURE__ */ React.createElement("br", null), is2Step ? `Eval hedge: ${evalHedgeContracts} ${inst.micro} = ${(evalHedgeRatio * 100).toFixed(0)}% \xB7 PA hedge: ${paHedgeContracts} ${inst.micro} = ${(paHedgeRatio * 100).toFixed(0)}% \xB7 Commissions: $${friction}/${inst.micro}/phase` : `Hedge: ${stfHedgeContracts} ${inst.micro} = ${(stfHedgeRatio * 100).toFixed(0)}% ratio \xB7 Commissions: $${friction}/${inst.micro}/phase`, /* @__PURE__ */ React.createElement("br", null), is2Step ? `PA hedge runs against $${payoutThreshold.toLocaleString()} funded gain (payout threshold) \u2014 $${payoutAmt.toLocaleString()} payout comes from those gains` : `Hedge runs against $${payoutThreshold.toLocaleString()} funded gain \u2014 $${payoutAmt.toLocaleString()} payout comes from those gains`, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: C.faint, fontSize: 9, marginTop: 4, display: "inline-block" } }, "TradeBlade PropPrimary + LiveHedge \xB7 NinjaTrader Platform")));
  }
  const _root = document.getElementById("hedge-analysis-root");
  _root && ReactDOM.createRoot(_root).render(React.createElement(HedgeAnalysis));
})();
