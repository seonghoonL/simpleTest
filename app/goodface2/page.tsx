"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
type Player = {
  id: number;
  name: string;
  image: string;
};

const PLAYERS: Player[] = [
{ id: 33, name: "BTS 정국", image: "/images/33.jpg" },
{ id: 34, name: "BTS 뷔", image: "/images/34.jpg" },
{ id: 35, name: "EXO 카이", image: "/images/35.jpg" },
{ id: 36, name: "세븐틴 민규", image: "/images/36.jpg" },
{ id: 37, name: "세븐틴 정한", image: "/images/37.jpg" },
{ id: 38, name: "스트레이키즈 현진", image: "/images/38.jpg" },
{ id: 39, name: "스트레이키즈 필릭스", image: "/images/39.jpg" },
{ id: 40, name: "NCT 마크", image: "/images/40.jpg" },
{ id: 41, name: "NCT 재현", image: "/images/41.jpg" },
{ id: 42, name: "EXO 백현", image: "/images/42.jpg" },
{ id: 43, name: "TXT 연준", image: "/images/43.jpg" },
{ id: 44, name: "TXT 수빈", image: "/images/44.jpg" },
{ id: 45, name: "엔하이픈 성훈", image: "/images/45.jpg" },
{ id: 46, name: "엔하이픈 희승", image: "/images/46.jpg" },
{ id: 47, name: "라이즈 원빈", image: "/images/47.jpg" },
{ id: 48, name: "트레저 지훈", image: "/images/48.jpg" },
{ id: 49, name: "에이티즈 산", image: "/images/49.jpg" },
{ id: 50, name: "에이티즈 우영", image: "/images/50.jpg" },
{ id: 51, name: "ZB1 성한빈", image: "/images/51.jpg" },
{ id: 52, name: "ZB1 장하오", image: "/images/52.jpg" },
{ id: 53, name: "라이즈 성찬", image: "/images/53.jpg" },
{ id: 54, name: "올데이 프로젝트 우찬", image: "/images/54.jpg" },
{ id: 55, name: "올데이 프로젝트 타잔", image: "/images/55.jpg" },
{ id: 56, name: "샤이니 민호", image: "/images/56.jpg" },
{ id: 57, name: "몬스타엑스 형원", image: "/images/57.jpg" },
{ id: 58, name: "몬스타엑스 주헌", image: "/images/58.jpg" },
{ id: 59, name: "갓세븐 진영", image: "/images/59.jpg" },
{ id: 60, name: "갓세븐 JAY B", image: "/images/60.jpg" },
{ id: 61, name: "보이넥스트도어 성호", image: "/images/61.jpg" },
{ id: 62, name: "보이넥스트도어 리우", image: "/images/62.jpg" },
{ id: 63, name: "NEXZ 유우", image: "/images/63.jpg" },
{ id: 64, name: "NEXZ 토모야", image: "/images/64.jpg" },

];

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const BG = "#f3f4f6";
const SKY = "#bfe6ff";
const INK = "#111827";

const FONT =
  '"Pretendard", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", Arial, "Apple SD Gothic Neo", sans-serif';

const text3d: React.CSSProperties = { textShadow: "0 2px 0 rgba(0,0,0,0.10)" };

const onBtnDown = (e: React.PointerEvent<HTMLButtonElement>) => {
  e.currentTarget.style.transform = "translateY(7px) scale(0.99)";
  e.currentTarget.style.boxShadow = "0 5px 0 rgba(0,0,0,0.18)";
};
const onBtnUp = (e: React.PointerEvent<HTMLButtonElement>) => {
  e.currentTarget.style.transform = "translateY(0px) scale(1)";
  e.currentTarget.style.boxShadow = "0 12px 0 rgba(0,0,0,0.18)";
};
const onBtnHover = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
  e.currentTarget.style.filter = "brightness(1.04)";
};
const onBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.transform = "translateY(0px) scale(1)";
  e.currentTarget.style.filter = "none";
};

function Card({
  player,
  isChampion = false,
}: {
  player: Player;
  isChampion?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 460,
        borderRadius: 26,
        overflow: "hidden",
        border: isChampion ? `3px solid ${SKY}` : `3px solid ${SKY}`,
        background: "#fff",
        boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
      }}
    >
      <img
        src={player.image}
        alt={player.name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "14px 0",
          background: "rgba(0,0,0,0.58)",
          color: "white",
          fontSize: 22,
          fontWeight: 900,
          textAlign: "center",
          ...text3d,
        }}
      >
        {player.name}
      </div>
    </div>
  );
}

export default function GoodfacePage() {
  const initialPlayers = useMemo(() => shuffle(PLAYERS), []);
  const [roundPlayers, setRoundPlayers] = useState<Player[]>(initialPlayers);
  const [winners, setWinners] = useState<Player[]>([]);
  const [index, setIndex] = useState(0);
  const [champion, setChampion] = useState<Player | null>(null);

  const left = roundPlayers[index];
  const right = roundPlayers[index + 1];

  const roundName =
    roundPlayers.length === 2
      ? "결승"
      : roundPlayers.length === 4
      ? "4강"
      : roundPlayers.length === 8
      ? "8강"
      : `${roundPlayers.length}강`;

  useEffect(() => {
    const neededWinners = roundPlayers.length / 2;

    if (winners.length === neededWinners) {
      if (winners.length === 1) {
        setChampion(winners[0]);
      } else {
        setRoundPlayers(winners);
        setWinners([]);
        setIndex(0);
      }
    }
  }, [roundPlayers.length, winners]);

  const pick = (player: Player) => {
    setWinners((prev) => [...prev, player]);
    setIndex((prev) => prev + 2);
  };

  const reset = () => {
    setRoundPlayers(shuffle(PLAYERS));
    setWinners([]);
    setIndex(0);
    setChampion(null);
  };

  const cardBtnBase: React.CSSProperties = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    borderRadius: 26,
    transition: "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  };

if (champion) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: BG,
        padding: "26px 18px 36px",
        display: "flex",
        justifyContent: "center",
        fontFamily: FONT,
      }}
    >
      <section style={{ width: "100%", maxWidth: 1000 }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 18,
            border: `3px solid ${SKY}`,
            background: "#fff",
            borderRadius: 26,
            padding: "18px 14px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 900,
              margin: 0,
              color: INK,
              ...text3d,
            }}
          >
            남자 아이돌 이상형 월드컵 우승
          </h1>
        </div>

        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <Card player={champion} isChampion />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <button
            onClick={reset}
            onMouseEnter={onBtnHover}
            onMouseLeave={onBtnLeave}
            onPointerDown={onBtnDown}
            onPointerUp={onBtnUp}
            onPointerCancel={onBtnUp}
            style={{
              marginTop: 24,
              borderRadius: 999,
              padding: "12px 18px",
              background: "#ffffff",
              border: `3px solid ${SKY}`,
              fontSize: 18,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 12px 0 rgba(0,0,0,0.18)",
              color: INK,
              fontFamily: FONT,
              transition: "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
              ...text3d,
            }}
          >
            다시 하기
          </button>

          <Link href="/" style={{ textDecoration: "none" }}>
            <button
              onMouseEnter={onBtnHover}
              onMouseLeave={onBtnLeave}
              onPointerDown={onBtnDown}
              onPointerUp={onBtnUp}
              onPointerCancel={onBtnUp}
              style={{
                marginTop: 24,
                borderRadius: 999,
                padding: "12px 18px",
                background: "#ffffff",
                border: `3px solid ${SKY}`,
                fontSize: 18,
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: "0 12px 0 rgba(0,0,0,0.18)",
                color: INK,
                fontFamily: FONT,
                transition: "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
                ...text3d,
              }}
            >
              홈으로
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}


  if (!left || !right) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: BG,
        padding: "26px 18px 36px",
        display: "flex",
        justifyContent: "center",
        fontFamily: FONT,
      }}
    >
      <section style={{ width: "100%", maxWidth: 1200 }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 24,
            border: `3px solid ${SKY}`,
            background: "#fff",
            borderRadius: 26,
            padding: "16px 14px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
          }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, color: INK, ...text3d }}>
            남자 아이돌 이상형 월드컵
          </h1>
          <p style={{ color: INK, opacity: 0.7, marginTop: 6, fontWeight: 900, ...text3d }}>
            {roundName} {Math.floor(index / 2) + 1}/{roundPlayers.length / 2}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 32,
          }}
        >
          <button
            onClick={() => pick(left)}
            style={cardBtnBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.filter = "brightness(1.02)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px) scale(1)";
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
            }}
          >
            <Card player={left} />
          </button>

          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#58B8FF",
              textShadow: "0 2px 0 rgba(0,0,0,0.10)",
              ...text3d,
            }}
          >
            VS
          </div>

          <button
            onClick={() => pick(right)}
            style={cardBtnBase}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.filter = "brightness(1.02)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px) scale(1)";
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
            }}
          >
            <Card player={right} />
          </button>
        </div>
      </section>
    </main>
  );
}