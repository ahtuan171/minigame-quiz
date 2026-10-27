# Giải Cứu Công Chúa Tóc Đỏ

A complete Vietnamese pixel-fantasy quiz adventure using React, TypeScript, Vite, Tailwind, and Lucide. No backend or game engine is required.

## Run

Use Node.js 22.18+ (or a newer release) for the app and the dependency-free TypeScript tests.

```sh
npm install
npm run dev
```

```sh
npm test
npm run typecheck
npm run build
npm run preview
```

Deploy `dist/` to a static host. Vite's relative asset base supports subdirectory hosting. Fonts, sprites, and all gameplay assets are local; no runtime external services are needed.

## Play

Begin the journey, then choose **Đi thôi, hiệp sĩ!**. The knight travels automatically and stops at ten quiz encounters. A correct answer defeats the enemy; each wrong answer costs one of three hearts and disables that choice. Hearts never regenerate. At zero hearts, restart from Game Over. Encounter ten is the final boss, followed by a visible rescue: the castle gate opens, and the princess walks out through it toward the knight before the treasure chest appears.

Each lifeline can be used once per adventure. 50/50 keeps the correct answer and one random wrong choice, accounting for previously failed choices. Skip works on the boss. Call a Friend displays the current question's stored hint.

Settings let the host edit the reward title, message, optional gift code, sender, and sound preference. Audio uses quiet synthesized answer tones, with no music or external audio assets. Restart resets hearts, encounters, and lifelines while preserving reward settings.

## Saves and privacy

Progress uses `red-princess.adventure.v1`; reward settings use the separate `red-princess.reward.v1` localStorage key. Saves happen synchronously after accepted gameplay events. Refresh returns to the welcome screen with **Tiếp tục hành trình**. Travel resumes from a ready state; interrupted defeat advances safely; damage and used lifelines are retained. Animation frames and active timers are never saved. Opening settings, opening a hint, returning home, or hiding the browser tab pauses scripted gameplay.

Configuration stays in the current browser/device. It is editable client-side and is not a secure place for confidential gift codes. If browser storage is blocked, the game continues in memory with a visible notice.

## Typography and art

Three self-hosted families are centralized in the Tailwind theme: Handjet (gameplay display, 600–700), VT323 (short gameplay labels, 400), and Be Vietnam Pro (readable UI, 400–600). Pixel fonts are confined to gameplay. The homepage, settings, and chest congratulations use standard Be Vietnam Pro typography. Local Latin, extended Latin, and Vietnamese subsets avoid mixed fallback glyphs. Font license notices are in `public/fonts/`.

The supplied `Sprite-sheet.png` is unchanged. Explicit atlas coordinates and small clip masks isolate irregular frames; characters preserve their proportions and bottom alignment. Running frames animate in CSS. Original SVGs remain as loading fallbacks. Reduced-motion mode disables motion without interrupting progression.

## Edit

- `src/data/questions.ts`: ten questions, answer IDs, hints, and encounter order.
- `src/data/enemies.ts`: enemy personalities and region names.
- `src/data/spriteSheet.ts`: atlas crop regions, knight poses, princess, boss, and chests.
- `src/lib/game.ts`: pure, guarded gameplay rules.
- `src/lib/storage.ts`: validated snapshots and separate reward settings.
- `src/hooks/useGame.ts`: progression, synchronous saving, pause/resume, and cancellable milestone timers.
- `src/components/GameWorld.tsx`: shared encounter scene.
- `src/components/PrincessRescueScene.tsx`, `TreasureChest.tsx`: reunion and reward reveal.
- `src/styles/typography.css`: type hierarchy; `gameplay.css`: full-adventure additions.
- `tests/game.test.mjs`, `storage.test.mjs`: full progression, health, lifelines, rapid events, refresh normalization, corrupt storage, and reward preservation.

The existing welcome composition and world components are reused. The retired one-encounter state machine has been replaced by the full rule set; the original tower illustration components remain available for reuse.

## Deploy to Vercel

1. Push this project to your Git repository.
2. Import the repository in Vercel and keep the project root as the root directory.
3. Vercel reads `vercel.json`: framework **Vite**, build command **npm run build**, output directory **dist**.
4. Deploy. No environment variables, database, or backend setup is needed.

Reward settings are local to the browser and domain. Configure the gift on the browser used to play after deployment. To include a shared default gift in the deployed site, edit `defaultSettings` in `src/lib/storage.ts` before deploying; those values are public client-side content.
