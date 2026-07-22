export type ThemeId = "classic" | "modern" | "minimal" | "elegant" | "playful" | "outono";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  layout: {
    heroStyle: "centered" | "split" | "fullscreen";
    showDecorativeElements: boolean;
    cardStyle: "rounded" | "sharp" | "organic";
    sectionSpacing: "compact" | "normal" | "spacious";
  };
  colors: {
    primary: string;
    accent: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
  };
  typography: {
    displayFont: string;
    bodyFont: string;
    headingWeight: number;
  };
  animations: {
    enabled: boolean;
    style: "subtle" | "moderate" | "playful";
  };
  heroComponent: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  classic: {
    id: "classic",
    name: "Classic Elegance",
    description: "Timeless design with traditional elegance",
    layout: {
      heroStyle: "centered",
      showDecorativeElements: true,
      cardStyle: "rounded",
      sectionSpacing: "normal",
    },
    colors: {
      primary: "#c8890e",
      accent: "#0e0b07",
      background: "#fbf7f1",
      textPrimary: "#f7f1e8",
      textSecondary: "#d8cfc3",
    },
    typography: {
      displayFont: "Cormorant Garamond",
      bodyFont: "Jost",
      headingWeight: 400,
    },
    animations: {
      enabled: true,
      style: "subtle",
    },
    heroComponent: "ClassicHero",
  },
  modern: {
    id: "modern",
    name: "Modern Minimal",
    description: "Clean lines and contemporary design",
    layout: {
      heroStyle: "split",
      showDecorativeElements: false,
      cardStyle: "sharp",
      sectionSpacing: "compact",
    },
    colors: {
      primary: "#2563eb",
      accent: "#1e293b",
      background: "#ffffff",
      textPrimary: "#0f172a",
      textSecondary: "#64748b",
    },
    typography: {
      displayFont: "Inter",
      bodyFont: "DM Sans",
      headingWeight: 600,
    },
    animations: {
      enabled: true,
      style: "subtle",
    },
    heroComponent: "ModernHero",
  },
  minimal: {
    id: "minimal",
    name: "Minimalist",
    description: "Simple and understated elegance",
    layout: {
      heroStyle: "centered",
      showDecorativeElements: false,
      cardStyle: "sharp",
      sectionSpacing: "spacious",
    },
    colors: {
      primary: "#171717",
      accent: "#fafafa",
      background: "#ffffff",
      textPrimary: "#171717",
      textSecondary: "#737373",
    },
    typography: {
      displayFont: "Libre Baskerville",
      bodyFont: "Lato",
      headingWeight: 400,
    },
    animations: {
      enabled: false,
      style: "subtle",
    },
    heroComponent: "MinimalHero",
  },
  elegant: {
    id: "elegant",
    name: "Romantic Elegance",
    description: "Soft and romantic with floral touches",
    layout: {
      heroStyle: "fullscreen",
      showDecorativeElements: true,
      cardStyle: "organic",
      sectionSpacing: "spacious",
    },
    colors: {
      primary: "#be185d",
      accent: "#831843",
      background: "#fdf2f8",
      textPrimary: "#831843",
      textSecondary: "#be185d",
    },
    typography: {
      displayFont: "Playfair Display",
      bodyFont: "Nunito",
      headingWeight: 500,
    },
    animations: {
      enabled: true,
      style: "moderate",
    },
    heroComponent: "ElegantHero",
  },
  playful: {
    id: "playful",
    name: "Fun & Vibrant",
    description: "Colorful and energetic celebration",
    layout: {
      heroStyle: "centered",
      showDecorativeElements: true,
      cardStyle: "rounded",
      sectionSpacing: "normal",
    },
    colors: {
      primary: "#f59e0b",
      accent: "#7c3aed",
      background: "#fffbeb",
      textPrimary: "#1f2937",
      textSecondary: "#6b7280",
    },
    typography: {
      displayFont: "EB Garamond",
      bodyFont: "Jost",
      headingWeight: 600,
    },
    animations: {
      enabled: true,
      style: "playful",
    },
    heroComponent: "PlayfulHero",
  },
  outono: {
    id: "outono",
    name: "Outono",
    description: "Premium autumn elegance with envelope opening animation",
    layout: {
      heroStyle: "fullscreen",
      showDecorativeElements: true,
      cardStyle: "rounded",
      sectionSpacing: "spacious",
    },
    colors: {
      primary: "#b45309",
      accent: "#78350f",
      background: "#fffbeb",
      textPrimary: "#451a03",
      textSecondary: "#92400e",
    },
    typography: {
      displayFont: "Cormorant Garamond",
      bodyFont: "Cormorant Garamond",
      headingWeight: 400,
    },
    animations: {
      enabled: true,
      style: "moderate",
    },
    heroComponent: "OutonoHero",
  },
};

export function getTheme(themeId: ThemeId): ThemeConfig {
  return THEMES[themeId] || THEMES.classic;
}

export function applyThemeToEvent(
  event: any,
  themeId: ThemeId
): any {
  const theme = getTheme(themeId);
  
  return {
    ...event,
    primaryColor: theme.colors.primary,
    accentColor: theme.colors.accent,
    backgroundStyle: theme.colors.background === "#fbf7f1" || theme.colors.background === "#fdf2f8" || theme.colors.background === "#fffbeb" ? "DARK" : "LIGHT",
    fontDisplay: theme.typography.displayFont,
    fontBody: theme.typography.bodyFont,
    themeConfig: theme,
  };
}