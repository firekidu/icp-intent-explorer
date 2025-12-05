export interface Country {
  code: string;
  name: string;
  region: string;
}

export const countries: Country[] = [
  // North America
  { code: "US", name: "United States", region: "North America" },
  { code: "CA", name: "Canada", region: "North America" },
  { code: "MX", name: "Mexico", region: "North America" },
  
  // Europe
  { code: "GB", name: "United Kingdom", region: "Europe" },
  { code: "DE", name: "Germany", region: "Europe" },
  { code: "FR", name: "France", region: "Europe" },
  { code: "IT", name: "Italy", region: "Europe" },
  { code: "ES", name: "Spain", region: "Europe" },
  { code: "NL", name: "Netherlands", region: "Europe" },
  { code: "BE", name: "Belgium", region: "Europe" },
  { code: "CH", name: "Switzerland", region: "Europe" },
  { code: "AT", name: "Austria", region: "Europe" },
  { code: "SE", name: "Sweden", region: "Europe" },
  { code: "NO", name: "Norway", region: "Europe" },
  { code: "DK", name: "Denmark", region: "Europe" },
  { code: "FI", name: "Finland", region: "Europe" },
  { code: "IE", name: "Ireland", region: "Europe" },
  { code: "PT", name: "Portugal", region: "Europe" },
  { code: "PL", name: "Poland", region: "Europe" },
  { code: "CZ", name: "Czech Republic", region: "Europe" },
  
  // Asia Pacific
  { code: "AU", name: "Australia", region: "Asia Pacific" },
  { code: "NZ", name: "New Zealand", region: "Asia Pacific" },
  { code: "JP", name: "Japan", region: "Asia Pacific" },
  { code: "KR", name: "South Korea", region: "Asia Pacific" },
  { code: "SG", name: "Singapore", region: "Asia Pacific" },
  { code: "HK", name: "Hong Kong", region: "Asia Pacific" },
  { code: "IN", name: "India", region: "Asia Pacific" },
  { code: "CN", name: "China", region: "Asia Pacific" },
  
  // Middle East
  { code: "AE", name: "United Arab Emirates", region: "Middle East" },
  { code: "SA", name: "Saudi Arabia", region: "Middle East" },
  { code: "IL", name: "Israel", region: "Middle East" },
  
  // South America
  { code: "BR", name: "Brazil", region: "South America" },
  { code: "AR", name: "Argentina", region: "South America" },
  { code: "CL", name: "Chile", region: "South America" },
  { code: "CO", name: "Colombia", region: "South America" },
  
  // Africa
  { code: "ZA", name: "South Africa", region: "Africa" },
  { code: "NG", name: "Nigeria", region: "Africa" },
  { code: "EG", name: "Egypt", region: "Africa" },
];

export const popularCountries = ["US", "GB", "DE", "FR", "CA", "AU", "NL", "SG"];
