import { ChevronDown, Crown, LockKeyhole, Map, Flag } from "lucide-react";
import { Sprite } from "./Sprite";

export function TowerMap({ floor }: { floor: number }) {
  return (
    <aside className="map-panel">
      <div className="map-heading">
        <span className="tiny-label">BẢN ĐỒ HÀNH TRÌNH</span>
        <Map size={17} />
      </div>
      <h2>Tháp Ánh Trăng</h2>
      <p>Một bước gần hơn đến phép màu</p>
      <details
        className="tower-details"
        open={window.matchMedia("(min-width: 761px)").matches}
      >
        <summary>
          <span>Tầng {floor} / 10 · Xem tòa tháp</span>
          <ChevronDown size={16} />
        </summary>
        <div className="map-tower">
          <div className="map-roof">
            <Crown size={22} />
          </div>
          <div className="map-princess">
            <Sprite kind="princess" />
            <span>Chờ bạn ở trên này!</span>
          </div>
          <ol className="floor-list">
            {Array.from({ length: 10 }, (_, index) => 10 - index).map(
              (number) => (
                <li
                  key={number}
                  className={`map-floor ${number === floor ? "current-floor" : ""} ${number === 10 ? "boss-floor" : ""}`}
                  aria-current={number === floor ? "step" : undefined}
                >
                  <span className="floor-number">
                    {String(number).padStart(2, "0")}
                  </span>
                  <span className="floor-window">
                    {number === floor ? (
                      <Flag size={15} />
                    ) : number === 10 ? (
                      <Crown size={15} />
                    ) : (
                      <LockKeyhole size={12} />
                    )}
                  </span>
                  <span className="floor-name">
                    {number === floor
                      ? "Bạn đang ở đây"
                      : number === 10
                        ? "Trùm cuối"
                        : "Chưa khám phá"}
                  </span>
                </li>
              ),
            )}
          </ol>
          <div className="map-base" />
        </div>
      </details>
      <div className="map-legend">
        <span />
        <span>Hành trình bắt đầu từ những bước nhỏ.</span>
      </div>
    </aside>
  );
}
