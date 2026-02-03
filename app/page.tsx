import Link from "next/link";

export default function HomePage() {
  const testCards = [
    {
      id: "mbti",
      title: "MBTI 테스트",
      description: "나의 진짜 성격 유형을 알아보세요.",
      icon: "🧠",
      color: "bg-blue-50",
      path: "/MbtiTest",
      tag: "인기",
    },
    {
      id: "ideal-mbti",
      title: "남자 아이돌 이상형 월드컵",
      description: "내 취향의 남자 아이돌은?",
      icon: "🏆",
      color: "bg-pink-50",
      path: "/goodface2",
      tag: "추천",
    },
    {
      id: "worldcup",
      title: "여자 아이돌 이상형 월드컵",
      description: "내 취향의 여자 아이돌은?",
      icon: "🏆",
      color: "bg-yellow-50",
      path: "/goodface",
      tag: "꿀잼",
    },
    {
      id: "politics",
      title: "정치 성향 테스트",
      description: "나의 사회적 가치관을 확인해보세요.",
      icon: "⚖️",
      color: "bg-slate-100",
      path: "/politicstest",
      tag: "신규",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 px-6 text-center bg-gradient-to-b from-indigo-50 to-white">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          심리 테스트 & <span className="text-indigo-600">월드컵</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          다양한 콘텐츠를 즐기고 나만의 결과를 확인해보세요.
          <br />
          데이터를 통해 더 정확한 분석을 제공합니다.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testCards.map((test) => (
            <Link href={test.path} key={test.id} className="group">
              <div
                className={`h-full p-8 rounded-[2rem] transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl ${test.color} border border-transparent group-hover:border-indigo-200 flex flex-col`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-5xl">{test.icon}</span>
                  <span className="px-3 py-1 bg-white/80 text-[11px] font-bold text-indigo-500 rounded-full shadow-sm">
                    #{test.tag}
                  </span>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {test.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {test.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center text-indigo-600 font-bold text-sm">
                  바로가기
                  <span className="ml-2 transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2026 심리분석 플랫폼 프로젝트. All rights reserved.</p>
      </footer>
    </main>
  );
}
