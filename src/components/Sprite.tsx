import { useId, useState } from "react";
import type { CSSProperties } from "react";
import { Crown, Shield, Gift } from "lucide-react";
import { assets } from "../data/assets";
import {
  characterFrames,
  happyPrincessFrames,
  knightFrames,
  spriteSheet,
} from "../data/spriteSheet";
import type { SpritePose } from "../data/spriteSheet";
import type { SpriteId } from "../types/game";

export function Sprite({
  kind,
  className = "",
  pose = "idle",
}: {
  kind: SpriteId;
  className?: string;
  pose?: SpritePose;
}) {
  const clipId = useId().replace(/:/g, "");
  const [atlasFailed, setAtlasFailed] = useState(false);
  const [failed, setFailed] = useState(false);
  const chest = kind === "chestClosed" || kind === "chestOpen";
  const canvas =
    kind === "princess" && pose === "victory"
      ? { width: 256, height: 256 }
      : chest
        ? { width: 256, height: 192 }
        : kind === "boss"
          ? { width: 320, height: 256 }
          : { width: 192, height: 256 };
  const label = chest
    ? "Rương báu phép thuật"
    : kind === "knight"
      ? "Hiệp sĩ nhỏ với áo choàng hồng và thanh kiếm bạc"
      : kind === "princess"
        ? "Công chúa tóc đỏ trong chiếc váy hồng"
        : kind === "boss"
          ? "Đại Vương Kẹo Bông"
          : "Người gác cổng tinh nghịch";
  const frames =
    kind === "knight"
      ? knightFrames[pose]
      : kind === "princess" && pose === "victory"
        ? happyPrincessFrames
        : characterFrames[kind];

  if (failed)
    return (
      <span
        className={`sprite sprite-fallback ${className}`}
        role="img"
        aria-label={label}
      >
        {chest ? <Gift /> : kind === "princess" ? <Crown /> : <Shield />}
      </span>
    );
  if (atlasFailed && (kind === "chestClosed" || kind === "chestOpen"))
    return (
      <span className="sprite sprite-fallback" role="img" aria-label={label}>
        <Gift />
      </span>
    );
  if (atlasFailed && kind !== "chestClosed" && kind !== "chestOpen")
    return (
      <img
        className={`sprite ${className}`}
        src={assets[kind]}
        alt={label}
        onError={() => setFailed(true)}
        draggable={false}
      />
    );

  return (
    <svg
      className={`sprite atlas-sprite ${frames.length > 1 ? "sprite-running" : ""} ${className}`}
      viewBox={`0 0 ${canvas.width} ${canvas.height}`}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label={label}
      focusable="false"
    >
      {frames.map((frame, index) => (
        <svg
          key={`${pose}-${index}`}
          className="atlas-frame"
          style={{ "--frame-index": index } as CSSProperties}
          x="0"
          y="0"
          width={canvas.width}
          height={canvas.height}
          viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`}
          preserveAspectRatio="xMidYMax meet"
          overflow="hidden"
          aria-hidden="true"
        >
          <defs>
            <clipPath id={`${clipId}-${index}`} clipPathUnits="userSpaceOnUse">
              {frame.clip ? (
                <polygon points={frame.clip} />
              ) : (
                <rect
                  x={frame.x}
                  y={frame.y}
                  width={frame.width}
                  height={frame.height}
                />
              )}
            </clipPath>
          </defs>
          <image
            clipPath={`url(#${clipId}-${index})`}
            href={spriteSheet.url}
            width={spriteSheet.width}
            height={spriteSheet.height}
            onError={() => setAtlasFailed(true)}
          />
        </svg>
      ))}
    </svg>
  );
}
