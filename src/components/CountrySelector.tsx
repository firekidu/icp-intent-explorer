import { useState, useRef, useEffect, useMemo } from "react";
import { Search, X, ChevronDown, Check } from "lucide-react";
import { countries, popularCountries, type Country } from "@/data/countries";
import { cn } from "@/lib/utils";

interface CountrySelectorProps {
  selectedCountries: string[];
  onChange: (countries: string[]) => void;
}

export function CountrySelector({ selectedCountries, onChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = useMemo(() => {
    if (!search) return countries;
    const lowerSearch = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.code.toLowerCase().includes(lowerSearch)
    );
  }, [search]);

  const groupedCountries = useMemo(() => {
    const groups: Record<string, Country[]> = {};
    filteredCountries.forEach((country) => {
      if (!groups[country.region]) {
        groups[country.region] = [];
      }
      groups[country.region].push(country);
    });
    return groups;
  }, [filteredCountries]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCountry = (code: string) => {
    if (selectedCountries.includes(code)) {
      onChange(selectedCountries.filter((c) => c !== code));
    } else {
      onChange([...selectedCountries, code]);
    }
  };

  const removeCountry = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedCountries.filter((c) => c !== code));
  };

  const selectAll = () => {
    onChange(countries.map((c) => c.code));
  };

  const clearAll = () => {
    onChange([]);
  };

  const selectPopular = () => {
    onChange(popularCountries);
  };

  const getCountryName = (code: string) => {
    return countries.find((c) => c.code === code)?.name || code;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Selected Tags Display */}
      <div
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className={cn(
          "min-h-[52px] p-2 rounded-lg border bg-card cursor-text",
          "flex flex-wrap gap-2 items-center",
          "transition-all duration-200",
          isOpen ? "border-primary shadow-focus" : "border-input hover:border-muted-foreground/50"
        )}
      >
        {selectedCountries.length === 0 ? (
          <span className="text-muted-foreground px-2">Select target markets...</span>
        ) : (
          selectedCountries.map((code) => (
            <span key={code} className="tag-chip animate-scale-in">
              {getCountryName(code)}
              <button
                onClick={(e) => removeCountry(code, e)}
                className="hover:bg-foreground/10 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))
        )}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground ml-auto transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-popover border border-border rounded-lg shadow-lg animate-fade-in overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search countries..."
                className="w-full pl-9 pr-4 py-2 bg-secondary rounded-md text-sm input-focus-ring border border-transparent"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 border-b border-border flex gap-2 flex-wrap">
            <button
              onClick={selectPopular}
              className="text-xs px-3 py-1.5 rounded-md bg-accent text-accent-foreground hover:brightness-95 transition-colors"
            >
              Popular Markets
            </button>
            <button
              onClick={selectAll}
              className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="text-xs px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Country List */}
          <div className="max-h-64 overflow-y-auto">
            {Object.entries(groupedCountries).map(([region, regionCountries]) => (
              <div key={region}>
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground bg-secondary/50 sticky top-0">
                  {region}
                </div>
                {regionCountries.map((country) => {
                  const isSelected = selectedCountries.includes(country.code);
                  return (
                    <button
                      key={country.code}
                      onClick={() => toggleCountry(country.code)}
                      className={cn(
                        "w-full px-3 py-2.5 flex items-center justify-between text-left text-sm",
                        "hover:bg-accent transition-colors",
                        isSelected && "bg-accent/50"
                      )}
                    >
                      <span>{country.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            ))}
            {filteredCountries.length === 0 && (
              <div className="px-3 py-6 text-center text-muted-foreground text-sm">
                No countries found matching "{search}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
