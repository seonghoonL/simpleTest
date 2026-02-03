"use client";

import { useMemo, useState, useEffect } from "react";

type Axis = "L" | "R";
type Question = { text: string; yes: Axis; no: Axis };

function shuffle<T>(array: T[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QUESTIONS: Question[] = [
  { text: "정부는 부유층에게 더 많은 세금을 걷어 복지에 사용해야 한다.", yes: "L", no: "R" },
  { text: "소득 격차 해소를 위해 국가 개입은 필수적이다.", yes: "L", no: "R" },
  { text: "복지 확대는 개인의 근로 의욕을 떨어뜨릴 수 있다.", yes: "R", no: "L" },
  { text: "기업 규제는 경제 성장을 저해한다고 생각한다.", yes: "R", no: "L" },
  { text: "최저임금은 물가보다 빠르게 인상될 필요가 있다.", yes: "L", no: "R" },

  { text: "노동자의 권리는 기업의 이익보다 우선되어야 한다.", yes: "L", no: "R" },
  { text: "정규직 보호 때문에 청년 일자리가 줄어든다고 생각한다.", yes: "R", no: "L" },
  { text: "노조의 파업권은 과도하게 보장되어 있다.", yes: "R", no: "L" },
  { text: "비정규직 사용은 기업 경쟁력을 위해 필요하다.", yes: "R", no: "L" },
  { text: "해고 요건은 지금보다 더 엄격해야 한다.", yes: "L", no: "R" },

  { text: "동성혼은 법적으로 허용되어야 한다.", yes: "L", no: "R" },
  { text: "전통적인 가족 형태가 사회의 기본이 되어야 한다.", yes: "R", no: "L" },
  { text: "개인의 자유는 사회 질서보다 우선할 수 있다.", yes: "L", no: "R" },
  { text: "표현의 자유는 불쾌감을 주더라도 최대한 보장되어야 한다.", yes: "L", no: "R" },
  { text: "도덕과 윤리는 법보다 앞서야 한다고 생각한다.", yes: "R", no: "L" },

  { text: "안보를 위해서는 개인의 자유 일부 제한도 감수할 수 있다.", yes: "R", no: "L" },
  { text: "북한 문제는 대화와 협력이 우선되어야 한다.", yes: "L", no: "R" },
  { text: "국가 정체성과 애국심 교육은 지금보다 강화되어야 한다.", yes: "R", no: "L" },
  { text: "검찰·경찰 권한은 지금보다 축소될 필요가 있다.", yes: "L", no: "R" },
  { text: "정치는 안정과 질서를 가장 우선해야 한다.", yes: "R", no: "L" },
];

function pct(a: number, b: number) {
  const t = a + b;
  if (t <= 0) return 50;
  return Math.round((a / t) * 100);
}

function GaugeRow(props: {
  leftLabel: string;
  rightLabel: string;
  leftCount: number;
  rightCount: number;
  sky: string;
  ink: string;
}) {
  const { leftLabel, rightLabel, leftCount, rightCount, sky, ink } = props;
  const leftPct = pct(leftCount, rightCount);
  const rightPct = 100 - leftPct;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px 320px 140px",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ textAlign: "right", fontWeight: 900, color: ink }}>
          {leftLabel} {leftPct}%
        </div>

        <div
          style={{
            height: 14,
            borderRadius: 999,
            background: "#ffffff",
            border: `3px solid ${sky}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${leftPct}%`,
              background: sky,
            }}
          />
        </div>

        <div style={{ textAlign: "left", fontWeight: 900, color: ink }}>
          {rightPct}% {rightLabel}
        </div>
      </div>
    </div>
  );
}

export default function PMain() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(QUESTIONS);

  useEffect(() => {
    setShuffledQuestions(shuffle(QUESTIONS));
  }, []);

  const total = shuffledQuestions.length;

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Axis[]>([]);
  const [scores, setScores] = useState<Record<Axis, number>>({
    L: 0,
    R: 0,
  });

  const done = idx >= total;
  const current = shuffledQuestions[idx];

  const answer = (isYes: boolean) => {
    if (!current) return;
    const letter = isYes ? current.yes : current.no;

    setScores((p) => ({ ...p, [letter]: p[letter] + 1 }));
    setAnswers((p) => [...p, letter]);
    setIdx((p) => p + 1);
  };

  const back = () => {
    if (idx <= 0) return;
    const last = answers[answers.length - 1];
    if (!last) return;

    setScores((p) => ({ ...p, [last]: Math.max(0, p[last] - 1) }));
    setAnswers((p) => p.slice(0, -1));
    setIdx((p) => Math.max(0, p - 1));
  };

  const reset = () => {
    setIdx(0);
    setAnswers([]);
    setScores({ L: 0, R: 0 });
  };

  const BG = "#eef1f4";
  const SKY = "#bfe6ff";
  const INK = "#111827";
  const GREEN = "#0f7a3a";

  const FONT =
    '"Pretendard", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", Arial, "Apple SD Gothic Neo", sans-serif';

  const maxW = 760;

  const text3d: React.CSSProperties = { textShadow: "0 2px 0 rgba(0,0,0,0.10)" };

  const btnSize = 156;
  const btnBase: React.CSSProperties = {
    width: btnSize,
    height: btnSize,
    borderRadius: 34,
    border: "5px solid #111827",
    color: "#111827",
    fontSize: 66,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 12px 0 rgba(0,0,0,0.18)",
    transition: "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
    fontFamily: FONT,
    ...text3d,
  };

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

  const prog = Math.min(idx, total);
  const progText = `${prog} / ${total}`;

  const totalAnswers = scores.L + scores.R;
  const leftPct = pct(scores.L, scores.R);
  const rightPct = 100 - leftPct;

  const BLUE = "#2563EB";
  const RED = "#DC2626";

  const resultLabel = leftPct === rightPct ? "중도" : leftPct > rightPct ? "진보" : "보수";
  const resultColor = leftPct === rightPct ? GREEN : leftPct > rightPct ? BLUE : RED;

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
      <section style={{ width: "100%", maxWidth: maxW }}>
        {(() => {
          const headerCardStyle: React.CSSProperties = {
            textAlign: "center",
            marginTop: 6,
            marginBottom: 18,
            border: `3px solid ${SKY}`,
            background: "#fff",
            borderRadius: 26,
            padding: "18px 14px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
          };

          const titleStyle: React.CSSProperties = {
            fontSize: 28,
            fontWeight: 900,
            margin: 0,
            color: INK,
            ...text3d,
          };

          const progressTextStyle: React.CSSProperties = {
            color: INK,
            opacity: 0.7,
            marginTop: 8,
            fontWeight: 900,
            ...text3d,
          };

          return (
            <div style={headerCardStyle}>
              <h1 style={titleStyle}>정치성향 간단 테스트</h1>
              <p style={progressTextStyle}>{progText}</p>
            </div>
          );
        })()}

        <div
          style={{
            marginTop: 18,
            border: `3px solid ${SKY}`,
            background: "#ffffff",
            borderRadius: 26,
            padding: "26px 22px 22px",
            boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
          }}
        >
          {!done ? (
            <>
              <div
                style={{
                  textAlign: "left",
                  fontSize: 26,
                  lineHeight: 1.35,
                  color: INK,
                  padding: "10px 10px 6px",
                  whiteSpace: "pre-wrap",
                  fontWeight: 900,
                  ...text3d,
                }}
              >
                {current?.text ?? ""}
              </div>

              <div style={{ marginTop: 26, display: "flex", justifyContent: "center", gap: 56, padding: "0 8px" }}>
                <button
                  onClick={() => answer(true)}
                  aria-label="O"
                  style={{ ...btnBase, background: "#58B8FF" }}
                  onMouseEnter={onBtnHover}
                  onMouseLeave={onBtnLeave}
                  onPointerDown={onBtnDown}
                  onPointerUp={onBtnUp}
                  onPointerCancel={onBtnUp}
                >
                  O
                </button>

                <button
                  onClick={() => answer(false)}
                  aria-label="X"
                  style={{ ...btnBase, background: "#FF6B6B" }}
                  onMouseEnter={onBtnHover}
                  onMouseLeave={onBtnLeave}
                  onPointerDown={onBtnDown}
                  onPointerUp={onBtnUp}
                  onPointerCancel={onBtnUp}
                >
                  X
                </button>
              </div>

              <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-start" }}>
                {idx > 0 && (
                  <button
                    onClick={back}
                    onMouseEnter={onBtnHover}
                    onMouseLeave={onBtnLeave}
                    onPointerDown={onBtnDown}
                    onPointerUp={onBtnUp}
                    onPointerCancel={onBtnUp}
                    style={{
                      borderRadius: 999,
                      padding: "10px 16px",
                      background: "#ffffff",
                      border: `3px solid ${SKY}`,
                      fontSize: 16,
                      fontWeight: 900,
                      cursor: "pointer",
                      boxShadow: "0 6px 0 rgba(0,0,0,0.10)",
                      color: "#000",
                      fontFamily: FONT,
                      transition: "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
                      ...text3d,
                    }}
                  >
                    뒤로
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", padding: "14px 6px 4px" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: INK, opacity: 0.85, ...text3d }}>테스트 완료!</div>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 52,
                    fontWeight: 900,
                    color: resultColor,
                    letterSpacing: 1,
                    ...text3d,
                  }}
                >
                  {resultLabel}
                </div>

                <div style={{ marginTop: 8, fontSize: 18, fontWeight: 900, color: INK, opacity: 0.85, ...text3d }}>
                  진보 {leftPct}% / 보수 {rightPct}%
                </div>

                {totalAnswers === 0 && (
                  <div style={{ marginTop: 8, fontSize: 14, color: INK, opacity: 0.6, fontWeight: 900, ...text3d }}>
                    응답이 없어서 기본값(50/50)으로 표시돼요.
                  </div>
                )}
              </div>

              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14, padding: "0 10px 8px" }}>
                <GaugeRow leftLabel="진보" rightLabel="보수" leftCount={scores.L} rightCount={scores.R} sky={SKY} ink={INK} />
              </div>

              <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
                <button
                  onClick={reset}
                  onMouseEnter={onBtnHover}
                  onMouseLeave={onBtnLeave}
                  onPointerDown={onBtnDown}
                  onPointerUp={onBtnUp}
                  onPointerCancel={onBtnUp}
                  style={{
                    borderRadius: 999,
                    padding: "12px 18px",
                    background: "#ffffff",
                    border: `3px solid ${SKY}`,
                    fontSize: 18,
                    fontWeight: 900,
                    cursor: "pointer",
                    boxShadow: "0 8px 0 rgba(0,0,0,0.14)",
                    color: "#111827",
                    fontFamily: FONT,
                    transition: "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
                    ...text3d,
                  }}
                >
                  다시하기
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
