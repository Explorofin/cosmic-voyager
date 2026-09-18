# Cosmic Voyager v1

A blockchain space opera. Cosmic Voyager — rotate, thrust, dock, fight, take contracts. Crypto is the *costume*, not a wallet. Single-folder HTML5: `index.html` + `game.js` + `style.css` + `assets`. No build, no Unity, no wallets.

## How to play

Open `index.html` in Chrome (double-click, or serve the folder). Every dock posts contracts; ambient memes (HOSKY, SNEK, WOW, IBC…) drift Cardano, Doge, and visited space.

1. 2s title lockup with a cyan load bar.
2. Circle picker: ten hulls around LAUNCH (ADA at 12 o'clock). Click or press **1-9** and **0**, then **LAUNCH**.
3. Fly. Dock at Cardano Prime (**E**). Take **HOSKY Meme Collection**, scoop memes, get paid in your home-chain ticker.

### Controls

| Key | Action |
|---|---|
| W / Up | Thrust (facing) |
| S / Down | Reverse burn |
| A D / Left Right | Rotate |
| Space or click | Fire |
| Q or [ ] | Cycle Pulse / Spread / Long-range |
| Tab | Chain special |
| Shift | Cardano shield (or Solana rapid fire) |
| E | Dock / interact |
| M | Star chart |
| Esc | Pause |
| N | Mute WebAudio |

### Credits (home-chain ticker)

HUD and dock prices use the faction you launched: ADA ₳, BTC ₿, ETH Ξ, SOL ◎, POL ●, DOGE Ð, XRP ✕, ATOM ⚛, LTC Ł, AVAX A. A Bitcoin pilot never sees ₳.

### Hull classes (7 tiers x 10 factions)

Scout, Courier, Patrol, Frigate, Cruiser, Dread, Flagship. Buy the next class at any station with your ticker. Each faction keeps its silhouette and grows it (fins, engines, guns) — not a scaled triangle. Enemies spawn at your tier or -1, never more than +1. Cardano Prime is T1 scouts, sparse. Far systems get meaner. HUD: TIER n / CLASSNAME.

ADA skins (Side / Wide / Top / Down / Yacht / Monument / Flames) are 2D cosmetics on top of tier. Flames/Monument stay hangar-only if the busy-background punch fails.

### Ledger

Dock panel lists the last ~12 movements: mission pay, scrap, ambient memes, repair, refit, hull-class buys. Persist in save. Earned vs spent.

## Ships (10)

Cardano A-wing (featured), Bitcoin blocky dread, Ethereum diamond yacht, Solana needle, Polkadot relay, Dogecoin chubby barge, Ripple liquidity skiff, Cosmos hub runner, Litecoin silver pick, Avalanche peak-runner.

Select picks faction. Dock buys tier.

## Art notes

- ADA_top.png / ADA_down.png are ~3-3.7MB Unsig plates (1280x720). Game loads *_sm.png at 512px. Originals kept.
- ADA_yacht.png is 3840x2160 / ~5MB; game uses ADA_yacht_sm.png (beige punched).
- ADA_flames.png / ADA_rooocket.png (~4MB, busy photo+sun bg). Downscaled; hangar thumbs only unless punch isolates the A.
- assets/3d/ has NewADARocketUpdated.obj + AROCKET.obj. Not wired. No Three.js in v1.

Sequel, not v1: a shared multiplayer universe. No netcode, no NFT minting.
