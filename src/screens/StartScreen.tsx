import {
  ArrowRight,
  Heart,
  KeyRound,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Castle } from "../components/Castle";

export function StartScreen({
  onStart,
  onContinue,
  hasProgress,
}: {
  onStart: () => void;
  onContinue: () => void;
  hasProgress: boolean;
}) {
  return (
    <main className="welcome-screen">
      <section className="welcome-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="small-star">✦</span> CÔNG CHÚA BỊ NHỐT. LÍNH GÁC
            CÒN BẬN RA CÂU ĐỐ.
          </div>
          <h1>
            Giải Cứu
            <br />
            Công Chúa
            <br />
            <span>
              Tóc Đỏ<span className="title-spark">✧</span>
            </span>
          </h1>
          <p className="story-subtitle">
            MƯỜI CỬA ẢI. KHÔNG CẦN GIỎI VUNG KIẾM.
          </p>
          <div className="story-rule">
            <span />
            <Heart size={12} fill="currentColor" />
            <span />
          </div>
          <p className="hero-story">
            Công chúa tóc đỏ bị nhốt trong lâu đài. Mười lính gác chặn đường,
            nhưng chỉ thích đố vui. May quá, hôm nay hiệp sĩ mang theo bạn.
          </p>
          <p className="hero-invitation">Kiếm đã mang. Kiến thức nhờ bạn lo.</p>
          <button className="primary-button start-button" onClick={onStart}>
            <WandSparkles size={21} />
            <span>
              {hasProgress ? "Bắt đầu hành trình mới" : "Bắt đầu hành trình"}
            </span>
            <ArrowRight size={19} />
          </button>
          {hasProgress && (
            <button className="continue-button" onClick={onContinue}>
              Tiếp tục hành trình <ArrowRight size={16} />
            </button>
          )}
          <div className="cta-caption">
            <span /> Có 3 tim và 3 trợ giúp. Đừng dùng hết ở cửa đầu nhé.
          </div>
        </div>
        <Castle />
      </section>
      <section className="journey-strip" aria-label="Điều gì đang chờ bạn">
        <div className="journey-intro">
          <span className="tiny-label">CHUYẾN ĐI CỦA BẠN</span>
          <h2>
            Đường không xa. <br />
            Lính gác hơi nhiều.
          </h2>
        </div>
        <div className="journey-item">
          <span className="feature-icon lavender">
            <KeyRound size={21} />
          </span>
          <div>
            <h3>10 cuộc chạm trán</h3>
            <p>Ai cũng có một câu để hỏi</p>
          </div>
        </div>
        <div className="journey-item">
          <span className="feature-icon pink">
            <Heart size={21} />
          </span>
          <div>
            <h3>3 phép trợ giúp</h3>
            <p>Bí quá thì cứ dùng</p>
          </div>
        </div>
        <div className="journey-item">
          <span className="feature-icon gold">
            <Sparkles size={21} />
          </span>
          <div>
            <h3>1 món quà đặc biệt</h3>
            <p>Qua ải rồi hãy mở</p>
          </div>
        </div>
      </section>
    </main>
  );
}
