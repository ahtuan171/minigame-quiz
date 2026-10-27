import { Heart, Sparkle } from "lucide-react";
import { Sprite } from "./Sprite";

export function Castle() {
  return (
    <div
      className="castle-scene"
      role="img"
      aria-label="Tòa tháp cổ tích dưới ánh trăng, công chúa tóc đỏ đang đợi ở ô cửa trên cao"
    >
      <div className="moon" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <span className="scene-spark spark-one">✦</span>
      <span className="scene-spark spark-two">✧</span>
      <span className="scene-spark spark-three">✦</span>
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="cloud cloud-three" />
      <div className="far-mountains" />
      <div className="castle-island">
        <div className="side-tower left-turret">
          <div className="turret-roof" />
          <div className="turret-body">
            <i />
            <i />
          </div>
        </div>
        <div className="side-tower right-turret">
          <div className="turret-roof" />
          <div className="turret-body">
            <i />
            <i />
          </div>
        </div>
        <div className="main-tower">
          <div className="flagpole">
            <span />
          </div>
          <div className="main-roof">
            <i />
          </div>
          <div className="tower-stone">
            <div className="princess-window">
              <Sprite kind="princess" />
              <Heart size={15} className="princess-heart" fill="currentColor" />
            </div>
            <div className="balcony" />
            <div className="tower-windows">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="tower-door">
              <span />
            </div>
          </div>
        </div>
        <div className="island-grass" />
        <div className="island-earth" />
        <div className="tiny-tree tree-left" />
        <div className="tiny-tree tree-right" />
        <div className="flowers">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="floating-note">
        <Sparkle size={16} />
        <span>Công chúa bị nhốt. Cần người mở khóa!</span>
      </div>
      <div className="scene-caption">
        <span /> THÁP ÁNH TRĂNG <span />
      </div>
    </div>
  );
}
