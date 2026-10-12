type HeroVisualKind = "brands" | "oem" | "applications" | "resources";

export default function InnerPageHeroVisual({
  kind,
}: {
  kind: HeroVisualKind;
}) {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="145"
        cy="90"
        r="78"
        fill="currentColor"
        fillOpacity="0.04"
        strokeOpacity="0.15"
      />
      {kind === "brands" && (
        <>
          <path
            d="M140 90 64 44M140 90 220 44M140 90 64 136M140 90 220 136"
            strokeOpacity="0.6"
          />
          <rect x="108" y="64" width="64" height="52" rx="12" fill="#0D418A" />
          <path d="m127 90 9 9 17-20" stroke="#F04A2A" strokeWidth="3" />
          <rect x="38" y="24" width="52" height="40" rx="9" fill="#082F68" />
          <rect x="194" y="24" width="52" height="40" rx="9" fill="#082F68" />
          <rect x="38" y="116" width="52" height="40" rx="9" fill="#082F68" />
          <rect x="194" y="116" width="52" height="40" rx="9" fill="#082F68" />
          <path
            d="M52 39h24M52 48h15M208 39h24M208 48h15M52 131h24M52 140h15M208 131h24M208 140h15"
            strokeOpacity="0.55"
          />
        </>
      )}
      {kind === "oem" && (
        <>
          <path
            d="M56 151h171M72 46h56M176 48h42M177 58h27M178 118h40M178 128h26"
            strokeOpacity="0.45"
          />
          <rect x="133" y="31" width="28" height="74" rx="10" fill="#0D418A" />
          <path d="M140 31V18h14v13M136 18h22M138 105l4 23h10l4-23M144 128l3 19 3-19M133 49h-12v14h12" />
          <rect
            x="140"
            y="55"
            width="14"
            height="24"
            rx="3"
            fill="#DCECFF"
            fillOpacity="0.16"
          />
          <path
            d="M88 74h19v49l10 13v15H78v-15l10-13V74Z"
            fill="#DCECFF"
            fillOpacity="0.07"
          />
          <path d="M85 139h25M145 43h5" stroke="#F04A2A" strokeWidth="3" />
        </>
      )}
      {kind === "applications" && (
        <>
          <path
            d="M58 151h174M87 34h42M94 34v57l-30 47a9 9 0 0 0 8 13h72a9 9 0 0 0 8-13l-30-47V34"
            fill="#DCECFF"
            fillOpacity="0.05"
          />
          <path
            d="M83 119c12-8 23 9 36 1 7-4 14-2 20 0M103 57h11M103 72h11"
            strokeOpacity="0.7"
          />
          <path d="M179 44h27M183 44v94a10 10 0 0 0 20 0V44M184 105h18" />
          <path d="M188 77h10M188 91h10" strokeOpacity="0.55" />
          <circle cx="102" cy="135" r="3" fill="#F04A2A" stroke="none" />
          <circle cx="121" cy="128" r="2" fill="#F04A2A" stroke="none" />
          <path d="M163 25h8M167 21v8M52 76h8M56 72v8" strokeOpacity="0.4" />
        </>
      )}
      {kind === "resources" && (
        <>
          <path
            d="M94 37H74a8 8 0 0 0-8 8v105a8 8 0 0 0 8 8h84a8 8 0 0 0 8-8v-10"
            strokeOpacity="0.5"
          />
          <path
            d="M111 22h65l33 33v78a8 8 0 0 1-8 8h-90a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8Z"
            fill="#0D418A"
          />
          <path
            d="M176 22v33h33M122 76h65M122 89h65M122 102h39"
            strokeOpacity="0.7"
          />
          <path
            d="M166 111v15m-6-6 6 6 6-6"
            stroke="#F04A2A"
            strokeWidth="2.5"
          />
          <path d="M122 44h26M122 53h18" strokeOpacity="0.5" />
        </>
      )}
    </svg>
  );
}
