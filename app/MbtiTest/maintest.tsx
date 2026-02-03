"use client";

import { useMemo, useState, useEffect } from "react";

type Axis = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
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
  { text: "파티에서 낯선 사람을 포함해 많은 사람들과 어울리는 걸 좋아한다.", yes: "E", no: "I" },
  { text: "모임이 길어져도 에너지가 유지된다.", yes: "E", no: "I" },
  { text: "사교 자리에서 누군가 말을 걸어오길 기다리기보다 내가 먼저 대화를 시작하는 편이다.", yes: "E", no: "I" },
  { text: "처음 보는 사람과의 교류는 에너지를 소모시키기보다 오히려 자극이 되어 에너지를 높여준다고 생각한다.", yes: "E", no: "I" },
  { text: "오랫동안 친하게 지내는 소수의 친구보다 짧게라도 자주 만나는 많은 친구들을 더 선호한다.", yes: "E", no: "I" },
  { text: "전화가 울리면 누군가 받기를 기다리기보다 내가 먼저 받는 편이다.", yes: "E", no: "I" },
  { text: "처음 보는 사람과의 교류에서 에너지를 얻기보다 소모되는 편이다.", yes: "I", no: "E" },
  { text: "혼자 해결할 수 있는 일이라도 다른 사람과 함께하는 편이 더 편하다.", yes: "E", no: "I" },
  { text: "생각을 정리할 때 글로 쓰기보다 말로 설명하는 게 더 잘 된다.", yes: "E", no: "I" },
  { text: "새로운 사람들과의 만남이 귀찮기보다 기대되는 편이다.", yes: "E", no: "I" },
  { text: "휴식 시간에도 혼자만의 시간보다 누군가와 가볍게 교류하는 게 좋다.", yes: "E", no: "I" },

  { text: "현실적이라기 보다 사색적인 편이다.", yes: "N", no: "S" },
  { text: "‘이상주의 및 몽상가’보다는 ‘상식에 얽매인 사람’ 쪽이 더 답답하게 느껴진다.", yes: "N", no: "S" },
  { text: "상상력이 풍부한 사람보다 현실적인 사람에게 더 매력을 느낀다.", yes: "S", no: "N" },
  { text: "가능성보다는 현실적인 일에 더 관심이 있다.", yes: "S", no: "N" },
  { text: "말이나 행동만으로도 충분히 전달된다고 느껴, 원칙까지 설명할 필요는 없다고 생각한다.", yes: "N", no: "S" },
  { text: "상상력이 풍부한 사람을 귀찮게 느끼기보다 긍정적으로 보는 편이다.", yes: "N", no: "S" },
  { text: "새로운 관점보다 검증된 방식이 더 신뢰할 만하다고 느낀다.", yes: "S", no: "N" },
  { text: "아이들의 행동을 이해할 때 상징적 의미보다는 실제 행동과 결과를 더 중요하게 본다.", yes: "S", no: "N" },
  { text: "나는 공상적이라기보다 실용적인 편이다.", yes: "S", no: "N" },
  { text: "나는 직감보다 경험을 더 믿는 편이다.", yes: "S", no: "N" },
  { text: "실용적인 것보다 독창적인 것이 나에게 더 잘 맞다.", yes: "N", no: "S" },
  { text: "나는 상상력보다 현실감을 더 강하게 느낀다.", yes: "S", no: "N" },
  { text: "서서히 호감이 쌓이기보다 첫인상에서 강하게 끌리는 편이다.", yes: "N", no: "S" },

  { text: "사람을 대할 때 개인적인 감정보다 객관적으로 접근하는 편이다.", yes: "T", no: "F" },
  { text: "모임 안에서 다른 사람들의 분위기와 상황을 잘 파악하고 있는다.", yes: "F", no: "T" },
  { text: "사람의 감정이나 가치관보다 논리와 타당성을 기준으로 판단하는 게 더 편하다.", yes: "T", no: "F" },
  { text: "공감과 배려보다 차분하고 이성적인 판단을 더 중시하는 편이다.", yes: "T", no: "F" },
  { text: "다른 사람이 나를 어떻게 보는지보다 그 사람이 어떻게 도움이 될 수 있는지를 더 자주 생각한다.", yes: "T", no: "F" },
  { text: "의사결정에서 감정의 영향보다 논리적 일관성을 더 중요하게 본다.", yes: "T", no: "F" },
  { text: "나는 자신의 능력과 판단을 믿는다.", yes: "T", no: "F" },
  { text: "누군가 고민을 털어놓을 때 공감보다 해결책을 먼저 제시하는 편이다.", yes: "T", no: "F" },
  { text: "결정이 누군가에게 상처가 되더라도 합리적이라면 필요하다고 생각한다.", yes: "T", no: "F" },
  { text: "사람 사이의 문제에서도 옳고 그름을 분명히 따지는 게 중요하다고 느낀다.", yes: "T", no: "F" },
  { text: "판단할 때 개인의 감정보다 공정성이 더 중요하다고 생각한다.", yes: "T", no: "F" },
  { text: "비판을 들을 때 감정적으로 받아들이기보다 내용의 타당성을 먼저 본다.", yes: "T", no: "F" },
  { text: "상대의 기분을 고려해 사실을 돌려 말하는 것이 불필요하다고 느껴질 때가 있다.", yes: "T", no: "F" },

  { text: "마감일이 정해져 있을 때 더 집중이 잘된다.", yes: "J", no: "P" },
  { text: "충동적으로 결정하기보다 신중하게 선택하는 편이다.", yes: "J", no: "P" },
  { text: "확정되지 않은 상황보다는 정해진 방향이 있는 상태를 좋아한다.", yes: "J", no: "P" },
  { text: "상황에 맞춰 대처하는 능력보다 체계적으로 정리하고 계획적으로 행동하는 능력이 더 칭찬받을 만하다고 생각한다.", yes: "J", no: "P" },
  { text: "우연히 일어나는 일보다 질서와 규칙 속에서 진행되는 일을 더 선호한다.", yes: "J", no: "P" },
  { text: "임시로 바꿀 수 있는 의견보다 한 번 결정하면 바뀌지 않는 의견을 더 선호한다.", yes: "J", no: "P" },
  { text: "결정을 내리기 전보다 결정을 내린 후에 더 안심된다.", yes: "J", no: "P" },
  { text: "물건을 자연스럽게 두는 것보다 깔끔하게 정리해 두는 걸 더 좋아한다.", yes: "J", no: "P" },
  { text: "구조나 계획이 없는 상황보다 명확한 구조와 계획이 있는 상황에서 더 편안함을 느낀다.", yes: "J", no: "P" },
  { text: "나는 내 결정에 자신이 있고 잘 흔들리지 않는다.", yes: "J", no: "P" },
  { text: "하루 일과가 미리 정해져 있지 않으면 불안해지는 편이다.", yes: "J", no: "P" },
  { text: "계획이 틀어지면 그때그때 대응하기보다 다시 정리하고 싶어진다.", yes: "J", no: "P" },
  { text: "즉흥적인 선택보다 준비된 선택이 더 만족스럽다.", yes: "J", no: "P" },
];

const PAIRS: [Axis, Axis][] = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"],
];

function computeType(scores: Record<Axis, number>) {
  return PAIRS.map(([a, b]) => (scores[a] >= scores[b] ? a : b)).join("");
}

function pct(a: number, b: number) {
  const t = a + b;
  if (t <= 0) return 50;
  return Math.round((a / t) * 100);
}

function GaugeRow(props: {
  left: Axis;
  right: Axis;
  leftCount: number;
  rightCount: number;
  sky: string;
  ink: string;
}) {
  const { left, right, leftCount, rightCount, sky, ink } = props;
  const leftPct = pct(leftCount, rightCount);
  const rightPct = 100 - leftPct;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 320px 80px",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ textAlign: "right", fontWeight: 900, color: ink }}>
          {left} {leftPct}%
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
          {rightPct}% {right}
        </div>
      </div>
    </div>
  );
}

export default function MainTest() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(QUESTIONS);

  useEffect(() => {
    setShuffledQuestions(shuffle(QUESTIONS));
  }, []);
  const total = shuffledQuestions.length;

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Axis[]>([]);
  const [scores, setScores] = useState<Record<Axis, number>>({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });

  const done = idx >= total;
  const current = shuffledQuestions[idx];

  const result = useMemo(() => {
    if (!done) return null;
    return computeType(scores);
  }, [done, scores]);

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
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  };

  const BG = "#eef1f4";
  const SKY = "#bfe6ff";
  const INK = "#111827";
  const GREEN = "#0f7a3a";

  const FONT =
    '"Pretendard", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans KR", Arial, "Apple SD Gothic Neo", sans-serif';

  const progress = total === 0 ? 0 : Math.min((idx / total) * 100, 100);
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
              <h1 style={titleStyle}>MBTI 간단 테스트</h1>
              <p style={progressTextStyle}>
                {Math.min(idx, total)} / {total}
              </p>
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
                    fontSize: 56,
                    fontWeight: 900,
                    color: GREEN,
                    letterSpacing: 2,
                    ...text3d,
                  }}
                >
                  {result}
                </div>
              </div>

              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14, padding: "0 10px 8px" }}>
                <GaugeRow left="E" right="I" leftCount={scores.E} rightCount={scores.I} sky={SKY} ink={INK} />
                <GaugeRow left="S" right="N" leftCount={scores.S} rightCount={scores.N} sky={SKY} ink={INK} />
                <GaugeRow left="T" right="F" leftCount={scores.T} rightCount={scores.F} sky={SKY} ink={INK} />
                <GaugeRow left="J" right="P" leftCount={scores.J} rightCount={scores.P} sky={SKY} ink={INK} />
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
