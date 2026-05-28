"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "diaadia" | "clinica" | "escalar";

type CategoryMeta = Record<Category, { label: string; description: string }>;

type Props = {
  categoryMeta: CategoryMeta;
  counts: Record<Category, number>;
  panelDiaadia: ReactNode;
  panelClinica: ReactNode;
  panelEscalar: ReactNode;
};

const categories: Category[] = ["diaadia", "clinica", "escalar"];

/**
 * Tabs UI for the Features section. Tabs y animaciones son client-side;
 * el contenido de cada panel viene pre-renderizado por el server component
 * padre (Features.tsx), así ScreenTile sigue siendo server.
 */
export default function FeaturesTabsClient({
  categoryMeta,
  counts,
  panelDiaadia,
  panelClinica,
  panelEscalar,
}: Props) {
  const [active, setActive] = useState<Category>("diaadia");

  const panels: Record<Category, ReactNode> = {
    diaadia: panelDiaadia,
    clinica: panelClinica,
    escalar: panelEscalar,
  };

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex justify-center mb-4">
        <div
          role="tablist"
          aria-label="Categorías de features"
          className="inline-flex bg-bg-card border border-border rounded-full p-1.5 shadow-sm"
        >
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 text-[15px] font-bold rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-navy text-white shadow-md"
                    : "text-ink-2 hover:text-navy hover:bg-mint-soft/40"
                }`}
              >
                {categoryMeta[cat].label}
                <span
                  className={`ml-2 inline-flex items-center justify-center min-w-[20px] h-[20px] text-[11px] rounded-full ${
                    isActive ? "bg-mint text-navy" : "bg-border text-ink-3"
                  }`}
                >
                  {counts[cat]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description under tabs */}
      <p className="text-center text-ink-2 text-[15px] mb-12 max-w-2xl mx-auto">
        {categoryMeta[active].description}
      </p>

      {/* Animated panel transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {panels[active]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
