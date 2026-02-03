"use client";

import { useMemo, useState, useEffect } from "react";

type Player = {
  id: number;
  name: string;
  image: string;
};

const PLAYERS: Player[] = [
  { id: 1, name: "에스파 카리나", image: "/images/1.jpg" },
  { id: 2, name: "에스파 닝닝", image: "/images/2.jpg" },
  { id: 3, name: "에스파 지젤", image: "/images/3.jpg" },
  { id: 4, name: "엔믹스 설윤", image: "/images/4.jpg" },
  { id: 5, name: "엔믹스 릴리", image: "/images/5.jpg" },
  { id: 6, name: "에스파 윈터", image: "/images/6.jpg" },
  { id: 7, name: "아이브 장원영", image: "/images/7.jpg" },
  { id: 8, name: "엔믹스 혜원", image: "/images/8.jpg" },
  { id: 9, name: "엔믹스 지우", image: "/images/9.jpg" },
  { id: 10, name: "아이브 안유진", image: "/images/10.jpg" },
  { id: 11, name: "트리플 에스 김채연", image: "/images/11.jpg" },
  { id: 12, name: "트리플 에스 김유연", image: "/images/12.jpg" },
  { id: 13, name: "잇지 유나", image: "/images/13.jpg" },
  { id: 14, name: "잇지 예지", image: "/images/14.jpg" },
  { id: 15, name: "잇지 채령", image: "/images/15.jpg" },
  { id: 16, name: "잇지 류진", image: "/images/16.jpg" },
  { id: 17, name: "아이브 리즈", image: "/images/17.jpg" },
  { id: 18, name: "트와이스 지효", image: "/images/18.jpg" },
  { id: 19, name: "트와이스 나연", image: "/images/19.jpg" },
  { id: 20, name: "프로미스나인 채영", image: "/images/20.jpg" },
  { id: 21, name: "프로미스나인 송하영", image: "/images/21.jpg" },
  { id: 22, name: "프로미스나인 박지원", image: "/images/22.jpg" },
  { id: 23, name: "뉴진스 민지", image: "/images/23.jpg" },
  { id: 24, name: "뉴진스 해린", image: "/images/24.jpg" },
  { id: 25, name: "프로미스나인 백지헌", image: "/images/25.jpg" },
  { id: 26, name: "아일릿 원희", image: "/images/26.jpg" },
  { id: 27, name: "아이들 미연", image: "/images/27.jpg" },
  { id: 28, name: "아이들 소연", image: "/images/28.jpg" },
  { id: 29, name: "아이들 슈화", image: "/images/29.jpg" },
  { id: 30, name: "아이들 우기", image: "/images/30.jpg" },
  { id: 31, name: "올데이 프로젝트 애니", image: "/images/31.jpg" },
  { id: 32, name: "하츠 투 하츠 이안", image: "/images/32.jpg" },
];

// 배열 섞기
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

  /**  우승 화면 */
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
              여자 아이돌 이상형 월드컵 우승
            </h1>
          </div>

          <div style={{ maxWidth: 420, margin: "0 auto" }}>
            <Card player={champion} isChampion />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
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
          </div>
        </section>
      </main>
    );
  }

  if (!left || !right) return null;

  /**  진행 화면 */
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
            여자 아이돌 이상형 월드컵
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
          {/* 왼쪽 카드 선택 */}
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

          {/* VS */}
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

          {/* 오른쪽 카드 선택 */}
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