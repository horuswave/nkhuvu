# Theme Components Architecture

## Overview

Each theme is now a **full React component** that gives you complete control over the invitation layout, structure, and styling. This allows for maximum customization beyond just colors and fonts.

## Structure

```
components/invitation/themes/
├── ThemeWrapper.tsx    # Routes to correct theme based on themeId
├── ClassicTheme.tsx    # Classic Elegance theme
├── ModernTheme.tsx     # Modern Minimal theme
├── MinimalTheme.tsx    # Minimalist theme
├── ElegantTheme.tsx    # Romantic Elegance theme
├── PlayfulTheme.tsx    # Fun & Vibrant theme
├── OutonoTheme.tsx     # Outono theme (with envelope animation)
├── CustomTheme.tsx     # Example of fully customized theme
└── index.ts           # Exports
```

## How It Works

### 1. Theme Selection (Automatic)

The `ThemeWrapper` component automatically selects the correct theme based on `event.themeConfig.id`:

```tsx
<ThemeWrapper
  event={themedEvent}
  guestName={guestName}
  token={token}
  maxAllowed={maxAllowed}
  existingRsvp={existingRsvp}
  existingCompanions={existingCompanions}
/>
```

### 2. Theme Component Structure

Each theme component receives the same props:

```tsx
interface ThemeProps {
  event: EventData & { themeConfig?: any };
  guestName: string;
  token: string;
  maxAllowed: number;
  existingRsvp: any;
  existingCompanions: any;
}
```

### 3. Basic Theme Template

Here's the structure of a basic theme:

```tsx
"use client";

import { useState } from "react";
import InvitationHero from "../InvitationHero";
import EventDetails from "../EventDetails";
import ProgramSection from "../ProgramSection";
import GiftListSection from "../Giftlistsection";
import RsvpForm from "../RsvpForm";
import type { EventData } from "@/types";

export default function MyCustomTheme({
  event,
  guestName,
  token,
  maxAllowed,
  existingRsvp,
  existingCompanions,
}: ThemeProps) {
  return (
    <main className="my-custom-theme">
      {/* Your custom layout here */}
      <InvitationHero event={event} guestName={guestName} />
      <EventDetails event={event} />
      <ProgramSection event={event} />
      <GiftListSection event={event} />
      <RsvpForm
        token={token}
        maxAllowed={maxAllowed}
        event={event}
        existingRsvp={existingRsvp}
        existingCompanions={existingCompanions}
      />
    </main>
  );
}
```

## Customization Examples

### Example 1: Reorder Sections

```tsx
export default function CustomTheme({ event, guestName, ...props }: ThemeProps) {
  return (
    <main className="custom-theme">
      {/* Hero first */}
      <InvitationHero event={event} guestName={guestName} />
      
      {/* Program before details */}
      <ProgramSection event={event} />
      
      {/* Details section */}
      <EventDetails event={event} />
      
      {/* Gift list */}
      <GiftListSection event={event} />
      
      {/* RSVP */}
      <RsvpForm {...props} event={event} />
    </main>
  );
}
```

### Example 2: Add Custom Elements

```tsx
export default function CustomTheme({ event, ...props }: ThemeProps) {
  return (
    <main className="custom-theme">
      <InvitationHero event={event} guestName={props.guestName} />
      
      {/* Custom announcement banner */}
      {event.dressCode && (
        <div className="dress-code-banner">
          <p>Dress Code: {event.dressCode}</p>
        </div>
      )}
      
      <EventDetails event={event} />
      <ProgramSection event={event} />
      <GiftListSection event={event} />
      <RsvpForm {...props} event={event} />
      
      {/* Custom footer */}
      <footer className="custom-footer">
        <p>Thank you for joining us!</p>
      </footer>
    </main>
  );
}
```

### Example 3: Conditional Rendering

```tsx
export default function CustomTheme({ event, ...props }: ThemeProps) {
  const hasProgram = event.programItems && event.programItems.length > 0;
  const hasGiftList = event.giftList && event.giftList.length > 0;

  return (
    <main className="custom-theme">
      <InvitationHero event={event} guestName={props.guestName} />
      <EventDetails event={event} />
      
      {/* Only show program if it exists */}
      {hasProgram && <ProgramSection event={event} />}
      
      {/* Only show gift list if it exists */}
      {hasGiftList && <GiftListSection event={event} />}
      
      <RsvpForm {...props} event={event} />
    </main>
  );
}
```

### Example 4: Custom Wrapper Components

```tsx
export default function CustomTheme({ event, ...props }: ThemeProps) {
  return (
    <main className="custom-theme">
      {/* Wrap hero in custom container */}
      <section className="hero-wrapper">
        <div className="hero-decoration" />
        <InvitationHero event={event} guestName={props.guestName} />
      </section>
      
      {/* Wrap details in custom card */}
      <div className="details-card">
        <EventDetails event={event} />
      </div>
      
      <ProgramSection event={event} />
      <GiftListSection event={event} />
      <RsvpForm {...props} event={event} />
    </main>
  );
}
```

### Example 5: Special Animations (Outono Style)

```tsx
"use client";

import { useState } from "react";
import EnvelopeOpening from "../EnvelopeOpening";

export default function SpecialTheme({ event, ...props }: ThemeProps) {
  const [opened, setOpened] = useState(false);

  // Custom opening animation
  if (!opened) {
    return (
      <EnvelopeOpening
        coupleNames={event.coupleNames}
        onOpen={() => setOpened(true)}
      />
    );
  }

  return (
    <main className="special-theme">
      <InvitationHero event={event} guestName={props.guestName} />
      {/* ... rest of sections */}
    </main>
  );
}
```

## Adding a New Theme

### Step 1: Create Theme Component

Create a new file in `components/invitation/themes/`:

```tsx
// components/invitation/themes/MyNewTheme.tsx
"use client";

import InvitationHero from "../InvitationHero";
import EventDetails from "../EventDetails";
import ProgramSection from "../ProgramSection";
import GiftListSection from "../Giftlistsection";
import RsvpForm from "../RsvpForm";
import type { EventData } from "@/types";

interface ThemeProps {
  event: EventData & { themeConfig?: any };
  guestName: string;
  token: string;
  maxAllowed: number;
  existingRsvp: any;
  existingCompanions: any;
}

export default function MyNewTheme({
  event,
  guestName,
  token,
  maxAllowed,
  existingRsvp,
  existingCompanions,
}: ThemeProps) {
  return (
    <main className="my-new-theme">
      <InvitationHero event={event} guestName={guestName} />
      <EventDetails event={event} />
      <ProgramSection event={event} />
      <GiftListSection event={event} />
      <RsvpForm
        token={token}
        maxAllowed={maxAllowed}
        event={event}
        existingRsvp={existingRsvp}
        existingCompanions={existingCompanions}
      />
    </main>
  );
}
```

### Step 2: Register in ThemeWrapper

```tsx
// components/invitation/themes/ThemeWrapper.tsx
import MyNewTheme from "./MyNewTheme";

export default function ThemeWrapper({ ...props }: ThemeWrapperProps) {
  const themeId = event.themeConfig?.id || "classic";

  switch (themeId) {
    // ... existing themes
    case "my-new-theme":
      return <MyNewTheme {...themeProps} />;
    default:
      return <ClassicTheme {...themeProps} />;
  }
}
```

### Step 3: Add Theme Configuration

```tsx
// lib/themes.ts
export const THEMES: Record<ThemeId, ThemeConfig> = {
  // ... existing themes
  "my-new-theme": {
    id: "my-new-theme",
    name: "My New Theme",
    description: "Description of my theme",
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
  },
};
```

### Step 4: Update TypeScript Types

```tsx
// lib/themes.ts
export type ThemeId = "classic" | "modern" | "minimal" | "elegant" | "playful" | "outono" | "my-new-theme";
```

## Styling Themes

Each theme component has a CSS class name that you can target:

- `classic-theme`
- `modern-theme`
- `minimal-theme`
- `elegant-theme`
- `playful-theme`
- `outono-theme`
- `custom-theme`

Add your custom styles in a global CSS file or use CSS modules:

```css
/* app/globals.css */
.custom-theme {
  /* Your custom styles */
}

.custom-theme .hero-wrapper {
  /* Custom hero styling */
}

.custom-theme .dress-code-banner {
  /* Custom banner styling */
}
```

## Available Components

You can use these pre-built components in your themes:

- `InvitationHero` - Hero section with couple names and date
- `EventDetails` - Information cards and contact details
- `ProgramSection` - Event timeline/program
- `GiftListSection` - Gift list section
- `RsvpForm` - RSVP form
- `EnvelopeOpening` - Envelope opening animation

## Best Practices

1. **Keep themes consistent** - Maintain similar component structure for consistency
2. **Use theme config** - Access `event.themeConfig` for theme-specific logic
3. **Respect event data** - Use event properties for dynamic content
4. **Test all themes** - Ensure each theme works with different event configurations
5. **Document custom themes** - Add comments explaining unique features

## Migration from Config-Based Themes

If you were using the old config-based system:

**Before:**
```tsx
// Theme was just a config object
const theme = getTheme("classic");
// Applied colors/fonts globally
```

**After:**
```tsx
// Theme is now a full component
<ClassicTheme event={event} {...props} />
// Complete control over layout and structure
```

## Benefits of Component-Based Themes

✅ **Complete layout control** - Order sections any way you want
✅ **Conditional rendering** - Show/hide sections based on event data
✅ **Custom animations** - Add theme-specific animations
✅ **Unique elements** - Add custom banners, dividers, footers, etc.
✅ **Easy maintenance** - Each theme is isolated in its own file
✅ **Scalable** - Easy to add new themes without modifying existing code
✅ **Type-safe** - Full TypeScript support

## Example Use Cases

1. **Wedding Theme** - Add engagement photo gallery, custom timeline
2. **Birthday Theme** - Add age-specific elements, fun animations
3. **Corporate Theme** - Professional layout, minimal decorations
4. **Holiday Theme** - Seasonal decorations, themed animations
5. **Minimal Theme** - Ultra-clean layout, no decorations

## Need Help?

Check the `CustomTheme.tsx` file for a complete example of a customized theme with:
- Custom section ordering
- Conditional elements
- Custom wrappers
- Special animations