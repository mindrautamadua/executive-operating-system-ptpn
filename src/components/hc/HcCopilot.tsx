import { copilotCommands, copilotGreeting } from "@/lib/hc-data";

function RobotHead() {
  return (
    <svg viewBox="0 0 90 80" className="h-full w-full">
      <defs>
        <linearGradient id="hcai-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#dde8f2" />
          <stop offset="100%" stopColor="#b6c9db" />
        </linearGradient>
        <linearGradient id="hcai-eye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ef7e0" />
          <stop offset="100%" stopColor="#25c8b0" />
        </linearGradient>
      </defs>
      <line x1="45" y1="4" x2="45" y2="14" stroke="#9db3c6" strokeWidth="2.5" />
      <circle cx="45" cy="4" r="3.5" fill="#5fd8ff" />
      <rect x="16" y="13" width="58" height="42" rx="17" fill="url(#hcai-body)" />
      <rect x="23" y="20" width="44" height="28" rx="13" fill="#16232f" />
      <ellipse cx="36" cy="34" rx="6" ry="6.8" fill="url(#hcai-eye)" />
      <ellipse cx="54" cy="34" rx="6" ry="6.8" fill="url(#hcai-eye)" />
      <ellipse cx="34.6" cy="31.8" rx="2" ry="2.3" fill="#eafffb" />
      <ellipse cx="52.6" cy="31.8" rx="2" ry="2.3" fill="#eafffb" />
      <rect x="9" y="28" width="7" height="14" rx="3.5" fill="#c3d4e2" />
      <rect x="74" y="28" width="7" height="14" rx="3.5" fill="#c3d4e2" />
      <rect x="26" y="55" width="38" height="20" rx="10" fill="url(#hcai-body)" />
      <circle cx="45" cy="65" r="3.4" fill="#25c8b0" />
    </svg>
  );
}

/** Copilot keputusan HC: quick command bergaya Why / Predict / Simulate / Recommend. */
export function HcCopilot() {
  return (
    <div className="card anim-rise px-4 pb-4 pt-3" style={{ "--d": "220ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          HC Intelligence Copilot
          <span className="rounded bg-ptpn-greenLight px-1 py-[1px] text-[9px] font-bold normal-case tracking-normal text-ptpn-green">
            AI
          </span>
        </h3>
        <button className="flex shrink-0 cursor-pointer items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline">
          Buka Copilot →
        </button>
      </div>

      <div className="mt-3 flex items-start gap-3">
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dfeaf8] to-[#c9dcf3]">
          <span className="block h-[40px] w-[44px] animate-floaty">
            <RobotHead />
          </span>
        </span>
        <p className="min-w-0 pt-1 text-[10px] font-medium leading-[1.5] text-ink-900">
          {copilotGreeting}
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        {copilotCommands.map((c) => {
          const solid = c.cmd === "RECOMMEND";
          return (
            <button
              key={c.cmd}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-[6px] text-left text-[9px] font-medium transition-colors ${
                solid
                  ? "bg-ptpn-green text-white hover:bg-ptpn-greenDark"
                  : "border border-[#e3e9ef] bg-white text-ink-700 hover:bg-[#f5f8fa]"
              }`}
            >
              <span
                className={`w-[58px] shrink-0 rounded px-1.5 py-[2px] text-center text-[7.5px] font-extrabold tracking-[0.04em] ${
                  solid ? "bg-white/20 text-white" : "bg-ptpn-greenLight text-ptpn-green"
                }`}
              >
                {c.cmd}
              </span>
              <span className="min-w-0 truncate">{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
