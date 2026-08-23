export type CountryCallingCode = {
  iso2: string;
  name: string;
  callingCode: string;
  flag: string;
};

// This fallback keeps the form usable before the one-time database seed runs.
// The seed script loads the complete ISO country list into PostgreSQL.
export const FALLBACK_COUNTRY_CALLING_CODES: CountryCallingCode[] = [
  { iso2: "IN", name: "India", callingCode: "+91", flag: "🇮🇳" },
  { iso2: "US", name: "United States", callingCode: "+1", flag: "🇺🇸" },
  { iso2: "GB", name: "United Kingdom", callingCode: "+44", flag: "🇬🇧" },
  { iso2: "AE", name: "United Arab Emirates", callingCode: "+971", flag: "🇦🇪" },
  { iso2: "AU", name: "Australia", callingCode: "+61", flag: "🇦🇺" },
  { iso2: "BD", name: "Bangladesh", callingCode: "+880", flag: "🇧🇩" },
  { iso2: "BR", name: "Brazil", callingCode: "+55", flag: "🇧🇷" },
  { iso2: "CA", name: "Canada", callingCode: "+1", flag: "🇨🇦" },
  { iso2: "CN", name: "China", callingCode: "+86", flag: "🇨🇳" },
  { iso2: "DE", name: "Germany", callingCode: "+49", flag: "🇩🇪" },
  { iso2: "ES", name: "Spain", callingCode: "+34", flag: "🇪🇸" },
  { iso2: "FR", name: "France", callingCode: "+33", flag: "🇫🇷" },
  { iso2: "ID", name: "Indonesia", callingCode: "+62", flag: "🇮🇩" },
  { iso2: "IE", name: "Ireland", callingCode: "+353", flag: "🇮🇪" },
  { iso2: "IT", name: "Italy", callingCode: "+39", flag: "🇮🇹" },
  { iso2: "JP", name: "Japan", callingCode: "+81", flag: "🇯🇵" },
  { iso2: "LK", name: "Sri Lanka", callingCode: "+94", flag: "🇱🇰" },
  { iso2: "MX", name: "Mexico", callingCode: "+52", flag: "🇲🇽" },
  { iso2: "MY", name: "Malaysia", callingCode: "+60", flag: "🇲🇾" },
  { iso2: "NP", name: "Nepal", callingCode: "+977", flag: "🇳🇵" },
  { iso2: "NL", name: "Netherlands", callingCode: "+31", flag: "🇳🇱" },
  { iso2: "NZ", name: "New Zealand", callingCode: "+64", flag: "🇳🇿" },
  { iso2: "PK", name: "Pakistan", callingCode: "+92", flag: "🇵🇰" },
  { iso2: "QA", name: "Qatar", callingCode: "+974", flag: "🇶🇦" },
  { iso2: "RU", name: "Russia", callingCode: "+7", flag: "🇷🇺" },
  { iso2: "SA", name: "Saudi Arabia", callingCode: "+966", flag: "🇸🇦" },
  { iso2: "SG", name: "Singapore", callingCode: "+65", flag: "🇸🇬" },
  { iso2: "TH", name: "Thailand", callingCode: "+66", flag: "🇹🇭" },
  { iso2: "ZA", name: "South Africa", callingCode: "+27", flag: "🇿🇦" },
].sort((left, right) => left.name.localeCompare(right.name));
