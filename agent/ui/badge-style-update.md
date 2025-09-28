# Badge Style Update

- Date: 2025-09-28
- Scope: All marketing badge chips
- Change: restored soft yellow-green gradient background + dark-green text for `.brand-chip` while keeping shared layout (`inline-flex rounded-full ...`).
- Palette: background `linear-gradient(135deg, rgba(255,240,205,0.92) -> rgba(223,246,214,0.95))`, text `#123524`, border `color-mix(in oklab, var(--brand-green), white 68%)`.
- Note: classes should remain `bg-secondary text-secondary-foreground brand-chip` to inherit tokens; gradient overrides background-color.
