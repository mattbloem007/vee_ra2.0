# Font Setup Instructions

## New Font Configuration

The website has been updated to use the following fonts:

1. **Rozelle** - For titles and headings
2. **Belwe Medium** - For subheadings and subtitles  
3. **Sweet Rosetia Sans** - For body text

## Required Font Files

You need to add the following font files to the `src/scss/fonts/` directory:

### Rozelle
- `Rozelle-Regular.otf`

### Belwe Medium
- `Belwe-Medium.otf`

### Sweet Rosetia Sans
- `Sweet-Rosetia-Sans-Regular.ttf`

## Font Sources

You can obtain these fonts from:
- **Rozelle**: Available from various font foundries
- **Belwe Medium**: Available from various font foundries  
- **Sweet Rosetia Sans**: Available from various font foundries

## Implementation Details

The fonts have been configured in:
- `src/scss/default/_variables.scss` - Main font variables and font-face declarations
- `src/scss/modern.scss` - Modern design system fonts
- `src/scss/fonts/fonts.css` - Font face declarations
- `src/scss/style.scss` - Main stylesheet that imports the fonts

## CSS Classes

Utility classes are available:
- `.font-rozelle` - Apply Rozelle font
- `.font-belwe` - Apply Belwe Medium font  
- `.font-sweet-rosetia` - Apply Sweet Rosetia Sans font

## Font Usage

- **Headings (h1-h6)**: Use Rozelle font
- **Subheadings and subtitles**: Use Belwe Medium font
- **Body text and paragraphs**: Use Sweet Rosetia Sans font

## Fallback Fonts

The fonts include fallbacks to system fonts for better performance and accessibility.

## Notes

- Make sure you have the proper licenses for these fonts
- The fonts are configured to load in OpenType (.otf) and TrueType (.ttf) formats
- Font weights and styles can be adjusted in the CSS variables as needed
- The fonts.css file is now properly imported in the main style.scss file

