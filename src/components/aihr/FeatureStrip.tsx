import { aihrFeatures } from "@/lib/aihr-data";

export function FeatureStrip() {
  return (
    <div
      className="card anim-rise grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pb-3.5 pt-3.5"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      {aihrFeatures.map(({ title, desc, icon: Icon }) => (
        <div key={title} className="flex items-start gap-2.5">
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-ptpn-greenLight text-ptpn-green">
            <Icon size={14} strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <div className="text-[9.5px] font-extrabold text-ink-900">{title}</div>
            <p className="mt-[2px] text-[8.5px] leading-[1.45] text-ink-500">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
