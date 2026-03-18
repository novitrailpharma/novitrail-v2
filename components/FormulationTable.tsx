"use client";

import { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnFiltersState,
  FilterFn,
} from "@tanstack/react-table";
import { X, ChevronDown, Filter, Search, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FormulationItem } from "@/types/formulation";

// --- Custom Filter Logic: Checks if row value exists in selected array ---
const multiSelectFilter: FilterFn<FormulationItem> = (
  row,
  columnId,
  filterValue: string[]
) => {
  const rowValue = row.getValue(columnId) as string;
  if (!filterValue || filterValue.length === 0) return true;
  return filterValue.includes(rowValue);
};

interface Props {
  data: FormulationItem[];
}

export default function FormulationTable({ data }: Props) {
  // State for Dropdown filters
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // State for Global Search Text
  const [globalFilter, setGlobalFilter] = useState("");

  // --- Table Configuration ---
  const columns = useMemo<ColumnDef<FormulationItem>[]>(
    () => [
      {
        header: "Drug / API",
        accessorFn: (row) => row.formulation.drug,
        cell: (info) => (
          <span className="font-semibold text-slate-900 dark:text-white">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        header: "Strength",
        accessorFn: (row) => row.formulation.strength?.join(", ") || "-",
        cell: (info) => (
          <span className="text-slate-700 dark:text-slate-300 font-medium">{info.getValue() as string}</span>
        ),
      },
      {
        header: "Dosage Form",
        accessorKey: "type",
        filterFn: multiSelectFilter,
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        header: "Route",
        accessorFn: (row) => row.formulation.route,
        id: "route", // Explicit ID is important for the filter dropdown to find this column
        filterFn: multiSelectFilter,
        cell: (info) => (
          <span className="text-slate-600">{info.getValue() as string}</span>
        ),
      },
      {
        header: "Therapeutic Class",
        accessorKey: "therapeutic_class",
        filterFn: multiSelectFilter,
        cell: (info) => (
          <span className="text-slate-600">{info.getValue() as string}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Helper to remove specific tags from the active list
  const removeFilterValue = (columnId: string, valueToRemove: string) => {
    setColumnFilters((prev) => {
      const existingFilter = prev.find((f) => f.id === columnId);
      if (!existingFilter) return prev;

      const currentValues = existingFilter.value as string[];
      const newValues = currentValues.filter((v) => v !== valueToRemove);

      if (newValues.length === 0) {
        return prev.filter((f) => f.id !== columnId);
      }
      return prev.map((f) =>
        f.id === columnId ? { ...f, value: newValues } : f
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* --- Toolbar Section --- */}
      <div className="bg-white dark:bg-dark-card p-1 rounded-xl">
        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4">
          
          {/* 1. Search Bar */}
          <div className="relative w-full xl:w-96 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search drug, strength, or class..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50/50 dark:bg-dark-bg dark:text-slate-200 focus:bg-white dark:focus:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-novitrail-blue/20 focus:border-novitrail-blue transition-all"
            />
          </div>

          {/* Divider (Desktop Only) */}
          <div className="hidden xl:block w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2"></div>

          {/* 2. Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full">

            <FilterDropdown
              title="Dosage Form"
              columnId="type"
              data={data}
              accessorKey="type"
              currentFilters={columnFilters}
              setColumnFilters={setColumnFilters}
            />

            <FilterDropdown
              title="Route"
              columnId="route"
              data={data}
              accessorKey="route"
              currentFilters={columnFilters}
              setColumnFilters={setColumnFilters}
              isNested
            />

            <FilterDropdown
              title="Therapeutic Class"
              columnId="therapeutic_class"
              data={data}
              accessorKey="therapeutic_class"
              currentFilters={columnFilters}
              setColumnFilters={setColumnFilters}
            />
          </div>
        </div>

        {/* --- Active Filter Chips --- */}
        <AnimatePresence>
          {columnFilters.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap items-center gap-2 pt-4 px-1"
            >
              {columnFilters.map((filter) => {
                const values = filter.value as string[];
                return values.map((val) => (
                  <motion.button
                    layout
                    key={`${filter.id}-${val}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => removeFilterValue(filter.id, val)}
                    className="group flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-100 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {val}
                    <X size={12} className="text-slate-400 group-hover:text-red-500" />
                  </motion.button>
                ));
              })}
              
              <button
                onClick={() => { setColumnFilters([]); setGlobalFilter(""); }}
                className="ml-auto text-xs font-semibold text-novitrail-orange hover:text-orange-700 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- Data Table --- */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-card shadow-sm">
        <div className="max-h-[65vh] overflow-y-auto custom-scrollbar">
          <table className="min-w-full text-sm border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 bg-slate-50 dark:bg-slate-800/80 shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-24 text-center text-slate-500 dark:text-slate-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full">
                        <FileText size={32} className="text-slate-300" />
                      </div>
                      <p className="text-lg font-medium text-slate-900 dark:text-white">No formulations found</p>
                      <p className="text-sm">Try adjusting your search or filters.</p>
                      <button
                        onClick={() => { setColumnFilters([]); setGlobalFilter(""); }}
                        className="mt-2 text-novitrail-orange font-medium hover:underline"
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`
                      group transition-colors
                      ${idx % 2 === 0 ? "bg-white dark:bg-dark-card" : "bg-slate-50/30 dark:bg-slate-800/20"}
                      hover:bg-blue-50/50 dark:hover:bg-slate-800/50
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 align-top group-last:border-none"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Stat */}
      <div className="flex justify-end px-2">
        <span className="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-dark-card px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
          Showing {table.getRowModel().rows.length} results
        </span>
      </div>
    </div>
  );
}

// --- Helper Component: Filter Dropdown ---
// --- Helper Component: Filter Dropdown (Polished) ---
function FilterDropdown({
  title,
  columnId,
  data,
  accessorKey,
  currentFilters,
  setColumnFilters,
  isNested = false
}: {
  title: string;
  columnId: string;
  data: any[];
  accessorKey: string;
  currentFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  isNested?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Internal search state

  // Extract unique options from data
  const options = useMemo(() => {
    if (!data) return [];
    
    const unique = new Set(data.map((item) => {
      if (isNested) return item.formulation?.[accessorKey];
      return item[accessorKey] || item.formulation?.[accessorKey];
    }));
    // @ts-ignore
    return Array.from(unique).filter(Boolean).sort();
  }, [data, accessorKey, isNested]);

  // Filter options based on internal search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) => 
      opt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Get currently selected values
  const selectedValues = (currentFilters.find((f) => f.id === columnId)?.value as string[]) || [];

  const toggleOption = (option: string) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];

    setColumnFilters((prev) => {
      const otherFilters = prev.filter((f) => f.id !== columnId);
      return newValues.length > 0
        ? [...otherFilters, { id: columnId, value: newValues }]
        : otherFilters;
    });
  };

  const clearFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setColumnFilters((prev) => prev.filter((f) => f.id !== columnId));
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setSearchQuery(""); // Reset search on open
        }}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          selectedValues.length > 0
            ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 ring-blue-100"
            : "bg-white dark:bg-dark-card border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:ring-slate-200"
        }`}
      >
        {title}
        {selectedValues.length > 0 && (
          <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
            {selectedValues.length}
          </span>
        )}
        <ChevronDown 
          size={14} 
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-72 max-h-[22rem] flex flex-col bg-white dark:bg-dark-card rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 z-40 overflow-hidden ring-1 ring-slate-900/5"
          >
            {/* Header: Title + Clear Button */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select {title}
              </span>
              {selectedValues.length > 0 && (
                <button
                  onClick={clearFilter}
                  className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Search Input (Only show if many options) */}
            <div className="p-2 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-dark-card shrink-0">
               <div className="relative">
                 <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                    type="text"
                    placeholder={`Filter ${title}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-dark-bg dark:text-slate-200 focus:bg-white dark:focus:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-novitrail-blue/20 focus:border-novitrail-blue/50 transition-all placeholder:text-slate-400"
                    autoFocus
                 />
               </div>
            </div>
            
            {/* Options List with Custom Scrollbar */}
            <div className="overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar min-h-0">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-all select-none group ${
                        isSelected 
                          ? "bg-blue-50/80 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200" 
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {/* Animated Checkbox */}
                      <div
                        className={`relative flex items-center justify-center w-4 h-4 border rounded transition-all duration-200 shrink-0 ${
                          isSelected
                            ? "bg-novitrail-orange border-novitrail-orange shadow-sm shadow-orange-200 dark:shadow-orange-900/30"
                            : "border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-bg group-hover:border-slate-400"
                        }`}
                      >
                        <AnimatePresence>
                          {isSelected && (
                            <motion.svg 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="w-2.5 h-2.5 text-white pointer-events-none" 
                              viewBox="0 0 12 12"
                            >
                              <path 
                                d="M3.5 6.5L5 8L8.5 4.5" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                fill="none"
                              />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => toggleOption(option)}
                      />
                      <span className="truncate font-medium">{option}</span>
                    </label>
                  );
                })
              ) : (
                <div className="py-6 text-center">
                  <p className="text-xs text-slate-400">No matching options</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scrollbar Styles (Injecting locally for component isolation) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>
    </div>
  );
}