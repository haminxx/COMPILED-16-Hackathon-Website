import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { DemoCall } from "@/components/DemoCall";

type DemoValue = { openDemo: () => void };

const DemoContext = createContext<DemoValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openDemo: () => setOpen(true) }), []);
  return (
    <DemoContext.Provider value={value}>
      {children}
      <DemoCall open={open} onClose={() => setOpen(false)} />
    </DemoContext.Provider>
  );
}

export function useDemo(): DemoValue {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used within DemoProvider");
  return value;
}
