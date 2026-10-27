import sheetUrl from "../../Sprite-sheet.png";

// Atlas regions reference the supplied image without modifying the source artwork.
// Coordinates are in source pixels. Each frame shares a bottom-aligned display box.
// Small silhouette masks exclude neighboring poses in the tightly packed source atlas.
export const spriteSheet = { url: sheetUrl, width: 1448, height: 1086 };
export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  clip?: string;
}
export type SpritePose = "idle" | "running" | "attack" | "hurt" | "victory";

export const knightFrames: Record<SpritePose, SpriteFrame[]> = {
  idle: [
    {
      x: 20,
      y: 25,
      width: 136,
      height: 230,
      clip: "80,59 62,66 58,78 48,82 57,102 70,103 60,136 73,151 51,176 28,190 20,202 20,207 29,211 28,219 35,229 62,230 59,245 139,245 141,240 135,233 135,225 151,208 155,186 154,169 136,159 144,148 149,113 136,93 109,81 105,69 92,59",
    },
  ],
  running: [
    {
      x: 282,
      y: 25,
      width: 143,
      height: 230,
      clip: "350,66 333,73 331,84 320,89 320,95 329,108 346,109 338,122 334,144 308,145 290,150 282,155 282,159 292,165 300,184 310,187 316,197 313,203 315,210 325,212 321,220 322,233 325,236 348,237 361,245 391,245 406,236 403,228 398,226 393,210 397,199 395,183 416,163 424,130 411,108 380,92 379,78 364,66",
    },
    {
      x: 405,
      y: 25,
      width: 130,
      height: 230,
      clip: "453,72 446,77 441,88 431,89 431,98 440,107 459,108 450,119 442,139 442,145 454,162 418,181 405,198 405,203 430,212 425,219 427,236 483,237 486,245 502,245 513,239 513,234 503,227 498,212 509,201 509,193 504,186 507,178 522,171 526,165 534,132 519,108 490,95 488,84 479,75 469,72",
    },
    {
      x: 527,
      y: 25,
      width: 119,
      height: 230,
      clip: "559,72 549,80 547,90 539,91 539,98 548,108 566,109 555,136 555,143 565,158 527,179 527,195 538,202 534,223 537,226 595,227 604,242 616,242 628,234 629,227 620,223 607,201 631,200 638,194 636,182 624,175 638,162 645,128 639,115 626,101 598,93 595,83 577,72",
    },
  ],
  attack: [
    {
      x: 638,
      y: 25,
      width: 181,
      height: 230,
      clip: "685,72 668,91 668,100 673,107 698,108 685,137 689,151 661,152 643,161 638,171 649,174 649,181 658,187 673,190 674,202 661,215 661,227 665,231 718,232 720,242 746,242 749,236 742,230 744,217 741,211 776,210 790,193 802,188 796,178 818,124 818,112 813,100 749,99 730,93 729,86 721,78 708,72",
    },
  ],
  hurt: [
    {
      x: 1127,
      y: 90,
      width: 165,
      height: 170,
    },
  ],
  victory: [
    {
      x: 1298,
      y: 40,
      width: 150,
      height: 220,
    },
  ],
};

export const characterFrames: Record<
  "princess" | "guard" | "boss" | "chestClosed" | "chestOpen",
  SpriteFrame[]
> = {
  princess: [{ x: 55, y: 275, width: 167, height: 240 }],
  guard: [{ x: 20, y: 524, width: 220, height: 200 }],
  chestClosed: [{ x: 965, y: 580, width: 200, height: 157 }],
  chestOpen: [{ x: 1180, y: 540, width: 238, height: 205 }],
  boss: [{ x: 4, y: 726, width: 488, height: 345 }],
};

export const happyPrincessFrames: SpriteFrame[] = [
  { x: 895, y: 275, width: 222, height: 240 },
];
