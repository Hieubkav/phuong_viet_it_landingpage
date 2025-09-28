# Business Pain Points Section

## Issue
- Text in the four cards was truncated by `line-clamp` utilities.
- Icons looked too small for the card layout.

## Fix
- Removed `line-clamp` classes so the full title and description remain visible.
- Increased the icon container to `h-16 w-16` and the icon size to `h-8 w-8` for better emphasis.

## Notes
- Re-run component snapshot/visual check if styles change again.
