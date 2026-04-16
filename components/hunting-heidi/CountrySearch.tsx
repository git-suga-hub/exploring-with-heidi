"use client";

import { useMemo, useState } from "react";
import cn from "classnames";
import { COUNTRIES, type Country } from "@/lib/countries";

type Props = {
  disabled: boolean;
  excludedCodes: Set<string>;
  onPick: (country: Country) => void;
  /** Shown when `disabled` is true (e.g. win vs give-up) */
  disabledPlaceholder?: string;
};

export default function CountrySearch({ disabled, excludedCodes, onPick, disabledPlaceholder }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return COUNTRIES.slice(0, 12);
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.code.includes(s) ||
        c.continent.toLowerCase().includes(s)
    ).slice(0, 12);
  }, [q]);

  const submit = (c: Country) => {
    if (excludedCodes.has(c.code)) return;
    onPick(c);
    setQ("");
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <label className="sr-only" htmlFor="country-search">
        Search for a country
      </label>
      <input
        id="country-search"
        type="text"
        autoComplete="off"
        disabled={disabled}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const pick = filtered.find((c) => !excludedCodes.has(c.code));
            if (pick) {
              e.preventDefault();
              submit(pick);
            }
          }
          if (e.key === "Escape") setOpen(false);
        }}
        placeholder={
          disabled
            ? (disabledPlaceholder ?? "Round ended — start a new game to play again")
            : "Type a country name…"
        }
        className={cn(
          "w-full rounded-brand border-2 border-ui-gray bg-white px-4 py-3 font-body text-ui-charcoal shadow-brand outline-none transition",
          "placeholder:text-ui-charcoal/40 focus:border-explorer-blue",
          disabled && "cursor-not-allowed opacity-60"
        )}
      />

      {open && !disabled && filtered.length > 0 && (
        <ul
          className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-brand border border-ui-gray bg-white py-1 shadow-lg"
          role="listbox"
        >
          {filtered.map((c) => {
            const taken = excludedCodes.has(c.code);
            return (
              <li key={c.code}>
                <button
                  type="button"
                  disabled={taken}
                  className={cn(
                    "flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-ui-cream",
                    taken && "cursor-not-allowed opacity-50"
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => submit(c)}
                >
                  <span className="font-display">{c.name}</span>
                  <span className="text-xs text-ui-charcoal/50">{c.continent}</span>
                  {taken && <span className="ml-auto text-xs text-ui-red">tried</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
