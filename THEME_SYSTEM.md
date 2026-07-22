# Theme System Implementation

## Overview
Each event can now have its own theme with different layouts, colors, fonts, and decorative elements. The theme system allows for complete customization of the invitation page appearance.

## Available Themes

### 1. Classic Elegance (`classic`)
- **Style**: Timeless design with traditional elegance
- **Colors**: Gold (#c8890e) on dark (#0e0b07)
- **Fonts**: Cormorant Garamond (display), Jost (body)
- **Layout**: Centered hero, decorative elements enabled
- **Spacing**: Normal
- **Card Style**: Rounded

### 2. Modern Minimal (`modern`)
- **Style**: Clean lines and contemporary design
- **Colors**: Blue (#2563eb) on dark slate (#1e293b)
- **Fonts**: Inter (display), DM Sans (body)
- **Layout**: Split hero, no decorative elements
- **Spacing**: Compact
- **Card Style**: Sharp corners

### 3. Minimalist (`minimal`)
- **Style**: Simple and understated elegance
- **Colors**: Black (#171717) on white (#fafafa)
- **Fonts**: Libre Baskerville (display), Lato (body)
- **Layout**: Centered hero, no decorative elements
- **Spacing**: Spacious
- **Card Style**: Sharp corners
- **Animations**: Disabled

### 4. Romantic Elegance (`elegant`)
- **Style**: Soft and romantic with floral touches
- **Colors**: Pink (#be185d) on deep purple (#831843)
- **Fonts**: Playfair Display (display), Nunito (body)
- **Layout**: Fullscreen hero, decorative elements enabled
- **Spacing**: Spacious
- **Card Style**: Organic (extra rounded)

### 5. Fun & Vibrant (`playful`)
- **Style**: Colorful and energetic celebration
- **Colors**: Amber (#f59e0b) on purple (#7c3aed)
- **Fonts**: EB Garamond (display), Jost (body)
- **Layout**: Centered hero, decorative elements enabled
- **Spacing**: Normal
- **Card Style**: Rounded
- **Animations**: Playful style

### 6. Outono (`outono`)
- **Style**: Autumn warmth with envelope opening animation
- **Colors**: Amber (#d97706) on brown (#78350f)
- **Fonts**: Playfair Display (display), Lato (body)
- **Layout**: Fullscreen hero, decorative elements enabled
- **Spacing**: Spacious
- **Card Style**: Rounded
- **Animations**: Moderate style
- **Special Features**: Envelope opening animation on page load with stamp showing couple initials

## Implementation Details

### Database Schema
- Added `themeId` field to the `Event` model (default: "classic")
- Migration required: `npx prisma migrate dev --name add-theme-support`

### Files Modified

1. **lib/themes.ts** - Theme configuration system
   - Defines all 6 themes with their properties
   - `getTheme()` function to retrieve theme by ID
   - `applyThemeToEvent()` function to apply theme colors and fonts to event

2. **prisma/schema.prisma** - Database schema
   - Added `themeId` field to Event model

3. **types/index.ts** - TypeScript types
   - Added `themeId` to `EventData` interface

4. **actions/events.ts** - Server actions
   - Updated `updateMyEvent()` to accept `themeId` parameter

5. **app/[locale]/admin/(protected)/settings/SettingsForm.tsx** - Admin interface
   - Added theme selector with visual preview cards
   - Theme selection automatically updates colors and fonts
   - Theme ID is saved with event settings

6. **app/[locale]/(public)/invite/[token]/page.tsx** - Invitation page
   - Applies selected theme to event before rendering
   - Passes themed event to all components

7. **components/invitation/InvitationHero.tsx** - Hero section
   - Respects `showDecorativeElements` setting
   - Conditionally renders decorative elements based on theme
   - Outono theme includes couple image placeholder in hero section

8. **components/invitation/EnvelopeOpening.tsx** - Envelope opening animation
   - Shows envelope with stamp containing couple initials on page load
   - Displays "Toque para abrir" prompt after 1.5 seconds
   - Opens envelope with flap animation when clicked
   - Only active for Outono theme

9. **components/invitation/InvitationWrapper.tsx** - Wrapper component
   - Manages envelope opening state for Outono theme
   - Shows envelope animation before revealing invitation content
   - Passes through all invitation components after envelope opens

10. **components/invitation/EventDetails.tsx** - Details section
   - Respects `sectionSpacing` (compact/normal/spacious)
   - Respects `cardStyle` (rounded/sharp/organic)
   - Applies appropriate spacing and border radius

## Usage

### For Admins
1. Go to Admin Panel → Settings
2. Navigate to the "Branding" tab
3. Scroll down to the "Theme" section
4. Click on any theme card to select it
5. The theme will automatically update colors, fonts, and layout settings
6. You can still manually override individual settings after selecting a theme
7. Click "Save Changes" to apply

### For Guests
- Guests will automatically see the invitation with the selected theme
- No action required from guests
- Theme is applied server-side before rendering

## Customization
Each theme can be customized by:
- Manually changing colors after selecting a theme
- Changing fonts independently
- Adjusting background style (DARK/LIGHT/IMAGE)
- All manual changes will be saved with the event

## Theme Properties

### Layout
- `heroStyle`: "centered" | "split" | "fullscreen"
- `showDecorativeElements`: boolean
- `cardStyle`: "rounded" | "sharp" | "organic"
- `sectionSpacing`: "compact" | "normal" | "spacious"

### Colors
- `primary`: Main accent color
- `accent`: Background/secondary color
- `background`: Background color
- `textPrimary`: Primary text color
- `textSecondary`: Secondary text color

### Typography
- `displayFont`: Font for headings
- `bodyFont`: Font for body text
- `headingWeight`: Font weight for headings

### Animations
- `enabled`: boolean
- `style`: "subtle" | "moderate" | "playful"

## Next Steps
1. Run database migration: `npx prisma migrate dev --name add-theme-support`
2. Test each theme by selecting it in the admin panel
3. Verify invitation pages render correctly with each theme
4. Consider adding more themes or allowing custom theme creation

## Notes
- Existing events will default to "classic" theme
- Theme selection is optional - admins can still use manual customization
- All theme changes are saved per event, so different events can have different themes