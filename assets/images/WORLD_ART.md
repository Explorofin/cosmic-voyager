# World / kit art — this pass

Painted sprites are loaded in `loadAssets` and drawn by the existing market/customize functions.
GenerateImage was not reachable from this box, so sprites were painted locally to match the ship-sheet vibe (lit, grainy, punchable black).

## Hooked
- `drawMarketGround` — `ground_tile.png` + `path_tile.png` sampled onto the existing perspective quads (walk collision unchanged)
- `drawStallBuilding` — facades for hangar / arcade / crane / cantilever / hexface / sails
- `drawPerson` — scout front/side, Epoch, mechanic, clerk, hoodie walkers; hat/glasses kit overlays on scout
- `drawShopInterior` — HOSKY/meme + mechanic backdrops (CRT shot + hull-on-lift + sparks still live)
- Customize pane — hat dropdown + glasses/hoodie buttons use `assets/images/kit/`

## Still procedural
- Remaining building shapes: atrium, habcubes, torus, needle
- Cafe / fuel / souvenir / ledger interiors
- Street props (crates, coils, banners, lamps)
- Crowd variety beyond the 5 walkers (they share scout/hoodie + overlays)
- Sky, landing pad, shade bench, door glow, speech puffs
- Visor color still a dropdown swatch (not a painted visor set)
