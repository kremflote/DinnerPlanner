import { siteColorClasses, type SiteTheme } from "../../styles/appStyles";

export const recipeBrowserStyles = {
  title: (theme: SiteTheme) =>
    `text-[40px] font-bold leading-[1.15] ${theme === "paletteLight" ? "text-[#556145]" : siteColorClasses[theme].plannerCounterAccent}`,
  searchInput: (theme: SiteTheme) =>
    `h-9 w-40 rounded-md border px-3 text-sm font-semibold outline-none placeholder:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
      theme === "dark"
        ? "border-white/[0.10] bg-neutral-200 text-neutral-900 focus-visible:outline-white"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-[#FAF7F2] text-[#556145] focus-visible:outline-[#7A8864]"
          : "border-neutral-300 bg-white text-neutral-900 focus-visible:outline-neutral-800"
    }`,
  headerControlsRow: "mt-3 flex flex-wrap items-center justify-between gap-3",
  searchControls: "flex items-center gap-3",
  headerActions: "flex items-center gap-3",
  filterButtonSlot: "h-9 w-9 shrink-0",
  filterButton: (theme: SiteTheme) =>
    `inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${
      theme === "dark"
        ? "border-white/[0.10] bg-neutral-500 text-neutral-950 hover:bg-neutral-400"
        : theme === "paletteLight"
          ? "border-[#7A8864]/35 bg-[#C8C0B5] text-[#556145] hover:bg-[#A9BDD1]/40"
          : "border-neutral-300 bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
    }`,
  filterChip: (theme: SiteTheme) =>
    `inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
      theme === "dark"
        ? "bg-white/[0.10] text-neutral-200 hover:bg-white/[0.16]"
        : theme === "paletteLight"
          ? "bg-[#E5D5BC] text-[#556145] hover:bg-[#C8C0B5]"
          : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
    }`,
  clearFilterChip: (theme: SiteTheme) =>
    `inline-flex items-start rounded-md px-0 py-1 text-[10px] font-bold leading-none transition-colors ${
      theme === "dark"
        ? "text-neutral-400 hover:text-white"
        : theme === "paletteLight"
          ? "text-[#7A8864] hover:text-[#556145]"
          : "text-neutral-500 hover:text-neutral-900"
    }`,
  ingredientPicker: (theme: SiteTheme) =>
    `fixed z-50 w-72 rounded-md border p-3 shadow-xl ${
      theme === "dark"
        ? "border-white/[0.12] bg-neutral-950 text-neutral-100"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-[#FAF7F2] text-[#556145]"
          : "border-neutral-200 bg-white text-neutral-900"
    }`,
  ingredientPickerSearch: (theme: SiteTheme) =>
    `h-9 w-full rounded-md border px-3 text-sm font-semibold outline-none placeholder:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
      theme === "dark"
        ? "border-white/[0.10] bg-neutral-200 text-neutral-900 focus-visible:outline-white"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-white text-[#556145] focus-visible:outline-[#7A8864]"
          : "border-neutral-300 bg-white text-neutral-900 focus-visible:outline-neutral-800"
    }`,
  ingredientPickerEmpty: (theme: SiteTheme) =>
    `rounded-md px-3 py-4 text-sm font-semibold ${
      theme === "dark"
        ? "bg-white/[0.04] text-neutral-400"
        : theme === "paletteLight"
          ? "bg-[#E5D5BC]/45 text-[#7A8864]"
          : "bg-neutral-100 text-neutral-500"
    }`,
  addButton: (theme: SiteTheme) =>
    `inline-flex h-9 w-32 items-center justify-center rounded-md border px-3 text-xs font-bold transition-colors ${
      theme === "dark"
        ? "border-white/[0.08] bg-black/50 text-white hover:bg-black/70"
        : theme === "paletteLight"
          ? "border-[#7A8864]/35 bg-[#7A8864] text-[#FAF7F2] hover:bg-[#6A7658]"
          : "border-neutral-300 bg-neutral-200 text-neutral-950 hover:bg-neutral-300"
    }`,
  modalBackdrop: "fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4",
  modalPanel: (theme: SiteTheme) =>
    `max-h-[calc(100vh_-_48px)] w-full max-w-3xl overflow-y-auto rounded-md border p-5 shadow-xl ${
      theme === "dark"
        ? "border-white/[0.12] bg-neutral-950 text-neutral-100"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-[#FAF7F2] text-[#556145]"
          : "border-neutral-200 bg-white text-neutral-900"
    }`,
  modalCloseButton: (theme: SiteTheme) =>
    `rounded-md px-3 py-2 text-sm font-bold transition-colors ${
      theme === "dark"
        ? "bg-white/[0.08] text-neutral-200 hover:bg-white/[0.14]"
        : theme === "paletteLight"
          ? "bg-[#E5D5BC] text-[#556145] hover:bg-[#C8C0B5]"
          : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
    }`,
  modalModeSwitch: (theme: SiteTheme) =>
    `mt-4 inline-flex h-9 overflow-hidden rounded-md border p-1 ${
      theme === "dark"
        ? "border-white/[0.08] bg-black/50"
        : theme === "paletteLight"
          ? "border-[#7A8864]/35 bg-[#7A8864]"
          : "border-neutral-300 bg-neutral-200"
    }`,
  modalModeOption: (theme: SiteTheme, selected: boolean) =>
    `flex h-7 min-w-28 items-center justify-center rounded-md px-4 text-xs font-semibold transition-colors ${
      selected
        ? theme === "dark"
          ? "bg-white/[0.14] text-white"
          : theme === "paletteLight"
            ? "bg-[#FAF7F2] text-[#556145]"
            : "bg-neutral-900 text-white"
        : theme === "dark"
          ? "text-neutral-400 hover:text-white"
          : theme === "paletteLight"
            ? "text-[#FAF7F2]/75 hover:text-[#FAF7F2]"
            : "text-neutral-600 hover:text-neutral-900"
    }`,
  form: "mt-5 grid gap-4",
  formGrid: "grid grid-cols-2 gap-4 max-md:grid-cols-1",
  field: "grid gap-2",
  label: (theme: SiteTheme) =>
    `text-xs font-bold ${
      theme === "dark" ? "text-neutral-300" : theme === "paletteLight" ? "text-[#556145]" : "text-neutral-700"
    }`,
  textField: (theme: SiteTheme) =>
    `h-10 rounded-md border px-3 text-sm font-semibold outline-none placeholder:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
      theme === "dark"
        ? "border-white/[0.10] bg-neutral-900 text-neutral-100 focus-visible:outline-white"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-white text-[#556145] focus-visible:outline-[#7A8864]"
          : "border-neutral-300 bg-white text-neutral-900 focus-visible:outline-neutral-800"
    }`,
  textArea: (theme: SiteTheme) =>
    `min-h-28 resize-y rounded-md border px-3 py-2 text-sm font-semibold leading-[1.5] outline-none placeholder:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
      theme === "dark"
        ? "border-white/[0.10] bg-neutral-900 text-neutral-100 focus-visible:outline-white"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-white text-[#556145] focus-visible:outline-[#7A8864]"
          : "border-neutral-300 bg-white text-neutral-900 focus-visible:outline-neutral-800"
    }`,
  helperText: (theme: SiteTheme) =>
    `text-xs font-semibold leading-[1.45] ${
      theme === "dark" ? "text-neutral-400" : theme === "paletteLight" ? "text-[#7A8864]" : "text-neutral-500"
    }`,
  checkboxGrid: "grid max-h-44 grid-cols-2 gap-2 overflow-y-auto rounded-md p-2 max-md:grid-cols-1",
  checkboxGridPanel: (theme: SiteTheme) =>
    theme === "dark"
      ? "bg-white/[0.04]"
      : theme === "paletteLight"
        ? "bg-[#E5D5BC]/45"
        : "bg-neutral-100",
  formActions: "flex flex-wrap items-center justify-end gap-3 pt-2",
  primaryButton: (theme: SiteTheme) =>
    `inline-flex h-10 min-w-32 items-center justify-center rounded-md border px-4 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${
      theme === "dark"
        ? "border-white/[0.12] bg-white/[0.14] text-white hover:bg-white/[0.2]"
        : theme === "paletteLight"
          ? "border-[#7A8864]/35 bg-[#7A8864] text-[#FAF7F2] hover:bg-[#6A7658]"
          : "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-700"
    }`,
  secondaryButton: (theme: SiteTheme) =>
    `inline-flex h-10 min-w-28 items-center justify-center rounded-md border px-4 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-55 ${
      theme === "dark"
        ? "border-white/[0.10] bg-transparent text-neutral-200 hover:bg-white/[0.08]"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-transparent text-[#556145] hover:bg-[#E5D5BC]/55"
          : "border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-100"
    }`,
  statusError: (theme: SiteTheme) =>
    `rounded-md border px-3 py-2 text-sm font-semibold ${
      theme === "dark"
        ? "border-red-400/30 bg-red-500/10 text-red-200"
        : theme === "paletteLight"
          ? "border-red-700/25 bg-red-700/10 text-red-800"
          : "border-red-200 bg-red-50 text-red-700"
    }`,
  cropPreview: (theme: SiteTheme) =>
    `aspect-square w-full overflow-hidden rounded-md border ${
      theme === "dark"
        ? "border-white/[0.10] bg-neutral-900"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-white"
          : "border-neutral-300 bg-neutral-100"
    }`,
  fileInput: (theme: SiteTheme) =>
    `block w-full cursor-pointer rounded-md border text-sm font-semibold file:mr-3 file:h-10 file:border-0 file:px-3 file:text-sm file:font-bold ${
      theme === "dark"
        ? "border-white/[0.10] bg-neutral-900 text-neutral-300 file:bg-white/[0.12] file:text-white"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-white text-[#556145] file:bg-[#E5D5BC] file:text-[#556145]"
          : "border-neutral-300 bg-white text-neutral-700 file:bg-neutral-200 file:text-neutral-900"
    }`,
  tabs: (theme: SiteTheme) =>
    `inline-flex h-9 overflow-hidden rounded-md border p-1 ${
      theme === "dark"
        ? "border-white/[0.08] bg-black/50"
        : theme === "paletteLight"
          ? "border-[#7A8864]/35 bg-[#7A8864]"
          : "border-neutral-300 bg-neutral-200"
    }`,
  tab: (theme: SiteTheme, selected: boolean) =>
    `flex h-7 min-w-32 items-center justify-center rounded-md px-5 text-xs font-semibold transition-colors ${
      selected
        ? theme === "dark"
          ? "bg-black text-white"
          : theme === "paletteLight"
            ? "bg-[#FAF7F2] text-[#556145]"
            : "bg-neutral-900 text-white"
        : theme === "dark"
          ? "text-neutral-400 hover:text-white"
          : theme === "paletteLight"
            ? "text-[#FAF7F2]/75 hover:text-[#FAF7F2]"
            : "text-neutral-600 hover:text-neutral-900"
    }`,
  filterRail: (theme: SiteTheme) =>
    `col-span-2 rounded-md p-3 max-lg:col-span-12 ${
      theme === "dark"
        ? "bg-white/[0.04]"
        : theme === "paletteLight"
          ? "bg-[#E5D5BC]/45"
          : "bg-neutral-100"
    }`,
  filterGroup: (theme: SiteTheme) =>
    `border-b pb-3 pt-3 first:pt-0 last:border-b-0 last:pb-0 ${
      theme === "dark" ? "border-white/[0.16]" : theme === "paletteLight" ? "border-[#7A8864]/25" : "border-neutral-300"
    }`,
  filterLegend: (theme: SiteTheme) =>
    `text-sm font-bold ${theme === "dark" ? "text-neutral-100" : theme === "paletteLight" ? "text-[#556145]" : "text-neutral-900"}`,
  clearFiltersButton: (theme: SiteTheme) =>
    `rounded-md px-1.5 py-1 text-[10px] font-bold leading-none transition-colors ${
      theme === "dark"
        ? "text-neutral-400 hover:bg-white/[0.08] hover:text-white"
        : theme === "paletteLight"
          ? "text-[#7A8864] hover:bg-[#C8C0B5]/70 hover:text-[#556145]"
          : "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900"
    }`,
  checkboxLabel: (theme: SiteTheme) =>
    `flex items-center gap-2 text-xs font-semibold ${
      theme === "dark" ? "text-neutral-300" : theme === "paletteLight" ? "text-[#556145]" : "text-neutral-700"
    }`,
  checkbox: "h-4 w-4 rounded border-neutral-400 accent-neutral-500",
  resultsWithFilters: "col-span-10 max-lg:col-span-12",
  recipeGrid: "grid grid-cols-4 gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1",
  ingredientGrid: "grid grid-cols-3 gap-3 max-xl:grid-cols-2 max-md:grid-cols-1",
  recipeCard: (theme: SiteTheme) =>
    theme === "dark"
      ? "ring-1 ring-white/[0.08]"
      : theme === "paletteLight"
        ? "ring-1 ring-[#7A8864]/20"
        : "ring-1 ring-neutral-200",
  emptyState: (theme: SiteTheme) =>
    `flex min-h-80 flex-col items-center justify-center rounded-md border p-8 text-center ${
      theme === "dark"
        ? "border-white/[0.08] bg-white/[0.035] text-neutral-200"
        : theme === "paletteLight"
          ? "border-[#C8C0B5] bg-[#FAF7F2]/70 text-[#556145]"
          : "border-neutral-200 bg-neutral-50 text-neutral-700"
    }`,
};

export function formatLabel(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
}
