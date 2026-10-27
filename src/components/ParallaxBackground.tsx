import type { CSSProperties } from "react";

export function ParallaxBackground() {
  return (
    <div className="parallax-background" aria-hidden="true">
      <div className="world-sky">
        <span className="world-moon" />
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="world-layer distant-layer">
        <div className="world-mountains" />
        <div className="world-mountains mountains-copy" />
        <div className="distant-castle">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="world-layer forest-layer">
        {Array.from({ length: 24 }, (_, index) => (
          <div
            key={index}
            className={`world-tree tree-type-${index % 3}`}
            style={
              {
                left: `${index * (100 / 24)}%`,
                "--tree-height": `${40 + (((index % 12) * 17) % 53)}%`,
              } as CSSProperties
            }
          >
            <i />
            <i />
          </div>
        ))}
      </div>
      <div className="world-haze" />
      <div className="world-ground">
        <div className="world-layer foreground-layer">
          {Array.from({ length: 48 }, (_, index) => (
            <span
              key={index}
              className={`ground-decoration decoration-${index % 4}`}
              style={{
                left: `${index * (100 / 48)}%`,
                top: `${7 + (index % 4) * 11}%`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="foreground-branch branch-left" />
      <div className="foreground-branch branch-right" />
      <span className="firefly firefly-one" />
      <span className="firefly firefly-two" />
      <span className="firefly firefly-three" />
    </div>
  );
}
