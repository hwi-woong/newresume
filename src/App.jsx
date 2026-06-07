import { useEffect, useRef, useState } from 'react';
import './App.css';

/* ──────────────── CONSTANTS ──────────────── */
const ASSETS = {
  profile: 'https://www.figma.com/api/mcp/asset/dab5bc89-10c0-403a-a9bc-9fcc79c0af87',
  bonDashboard: 'https://www.figma.com/api/mcp/asset/576f6a70-87a0-4375-a364-2fe5afc76fe4',
  bonChatbot: 'https://www.figma.com/api/mcp/asset/ebee11f7-2e37-4031-8953-2eee91c91803',
  bonPhone: 'https://www.figma.com/api/mcp/asset/2e937a3e-d3c7-4b12-9fb5-7db2503ea8ef',
  bonLogo: 'https://www.figma.com/api/mcp/asset/8243d2e2-f7a6-4b7d-9a80-8efbdca3726e',
  ottReview: 'https://www.figma.com/api/mcp/asset/695505d6-03d1-46bc-80b4-e942f2f9d968',
  studyMate: 'https://www.figma.com/api/mcp/asset/9018b149-c8df-4bd4-b61b-291a838e31f0',
  bollog: 'https://www.figma.com/api/mcp/asset/73e53dc7-2c5a-4fa2-9692-06a1e256ca26',
  notion: 'https://www.figma.com/api/mcp/asset/e0a46c50-d795-4695-8d25-1639ff827505',
  teams: 'https://www.figma.com/api/mcp/asset/5bb6dd97-1373-4db2-b26c-ff8a50a8b44a',
  jira: 'https://www.figma.com/api/mcp/asset/acdf5e30-53e3-4662-81d6-ad873cdb5a2c',
  slack: 'https://www.figma.com/api/mcp/asset/225647fa-c556-4461-addc-62d52e36ff04',
  python: 'https://www.figma.com/api/mcp/asset/cb94f598-cc2d-499f-8dcf-d0f070a8080c',
  excel: 'https://www.figma.com/api/mcp/asset/eab819eb-f2b6-430e-950b-e4038fd9b0b5',
  figma: 'https://www.figma.com/api/mcp/asset/a733abad-dabd-444f-8ff5-b746ba83cc34',
};

const WORK_EXPERIENCE = [
  {
    date: '2025.09 — 현재',
    company: '본아이에프',
    role: 'Store Manager',
    bullets: ['매장 관리 및 운영 총괄', '매장 운영 효율화를 위한 챗봇 개발', '데이터 분석을 통한 매출 상승 전략 제시'],
  },
  {
    date: '2025.02 — 2025.07',
    company: '페이히어',
    role: 'Sales Management',
    bullets: ['프로모션 기획 및 실행', '고객 데이터 이관 작업', '코디네이팅 업무'],
  },
  {
    date: '2024.07 — 2024.12',
    company: '인포뱅크 Icomm',
    role: '기획 인턴',
    bullets: [
      '예약 챗봇 운영 및 기획',
      '사용자 관점의 홍보 영상 및 팜플렛 제작 참여',
      '신규 병원 유치 50개 달성',
      'B2B 메시징 서비스 페이지 기획으로 고객 맞춤형 솔루션 제공',
    ],
  },
  {
    date: '2022.04 — 2022.12',
    company: '두산베어스',
    role: '마케팅',
    bullets: [
      'SNS 콘텐츠 제작 및 마케팅 보조 업무, 브랜드 인지도 향상에 기여',
      '구단 대면 행사 기획으로 현장 운영 경험 및 고객 소통 능력 강화',
      '구단 안내데스크 고객 응대 업무',
    ],
  },
];

const PROJECTS = [
  {
    id: 'bon',
    featured: true,
    period: '2025.09 — 현재',
    tags: ['Internship', '기획', '챗봇'],
    title: '본아이에프 SM',
    subtitle: 'internship',
    desc: '매장 운영 총괄 및 데이터 분석을 통한 매장 효율 최적화. 고객 응대 자동화를 위한 챗봇 시스템 기획 및 매출 증대를 위한 매장 운영 효율화 방안을 제안했습니다.',
    bullets: ['매장 운영을 위한 챗봇 제작', '매출 증대를 위한 매장 운영 효율화 제안'],
    link: 'https://bon-fe.vercel.app/',
    img: ASSETS.bonDashboard,
  },
  {
    id: 'ott',
    featured: false,
    period: '23.11 — 24.01',
    tags: ['기획', '프론트개발'],
    title: 'OTT 리뷰 플랫폼',
    desc: '매니아 층을 위한 OTT 리뷰 프로그램 기획 및 프론트개발',
    bullets: ['기획자로서 덕후 타겟 니즈 분석 및 차별화 전략 수립', '마니아층을 위한 OTT 리뷰 프로그램 기획 및 론칭으로 커뮤니티 활성화 기여'],
    img: ASSETS.ottReview,
  },
  {
    id: 'studymate',
    featured: false,
    period: '24.03',
    tags: ['기획', '운영', '마케팅'],
    title: '스터디메이트',
    desc: '대학생을 위한 스터디, 멘토링 매칭 플랫폼 기획 및 운영',
    bullets: ['팀장으로 개발자·디자이너와 협업', '출시 후 인스타 개설·부스 운영 등 마케팅 업무', '교내 학습공동체 프로그램 연계 추진'],
    img: ASSETS.studyMate,
  },
  {
    id: 'bollog',
    featured: false,
    period: '24.07 — 24.08',
    tags: ['기획', '운영', '커뮤니티'],
    title: '볼로그',
    desc: '야구 팬들을 위한 커뮤니티, 블로그, 쇼츠 플랫폼 제작 및 운영',
    bullets: ['팀장으로 팀원 간 갈등 해결 및 조정 담당', '출시 후 서비스 이용 독려 및 QA 진행', '서비스 회고를 통한 개선 포인트 도출'],
    img: ASSETS.bollog,
  },
];

const SKILLS = [
  { name: 'Notion', img: ASSETS.notion },
  { name: 'Teams', img: ASSETS.teams },
  { name: 'Jira', img: ASSETS.jira },
  { name: 'Slack', img: ASSETS.slack },
  { name: 'Python', img: ASSETS.python },
  { name: 'Excel', img: ASSETS.excel },
  { name: 'Figma', img: ASSETS.figma },
];

/* ──────────────── HOOK: Scroll Animate ──────────────── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ──────────────── SUB-COMPONENTS ──────────────── */
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function ProjectCard({ project, delay }) {
  if (project.featured) {
    return (
      <FadeIn delay={delay} className="project-card project-card--featured">
        <div className="project-thumb">
          <img src={project.img} alt={project.title} loading="lazy" />
        </div>
        <div className="project-body">
          <div className="project-tags">
            <span className="project-period">{project.period}</span>
            {project.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
          <div className="project-title">{project.title}</div>
          <p className="project-desc">{project.desc}</p>
          <ul className="project-role-list">
            {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
              결과물 보기 <span>→</span>
            </a>
          )}
        </div>
      </FadeIn>
    );
  }
  return (
    <FadeIn delay={delay} className="project-card project-card--regular">
      <div className="project-thumb">
        <img src={project.img} alt={project.title} loading="lazy" />
      </div>
      <div className="project-body">
        <div className="project-tags">
          <span className="project-period">{project.period}</span>
          {project.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
        </div>
        <div className="project-title">{project.title}</div>
        <p className="project-desc">{project.desc}</p>
        <ul className="project-role-list">
          {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </FadeIn>
  );
}

/* ──────────────── MAIN APP ──────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-logo">진휘웅 · JHW</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="hero-text">
            <p className="hero-label">Product Planner · UX Strategist</p>
            <h1 className="hero-name">진휘웅</h1>
            <p className="hero-subtitle">데이터 기반의 사용자 중심 기획자</p>
            <p className="hero-desc">
              사용자의 니즈를 분석하고 데이터로 검증하며,<br />
              개발자·디자이너와 함께 실질적인 가치를 만들어내는 PM/기획자입니다.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">Projects 보기</a>
              <a href="#contact" className="btn btn-outline">연락하기</a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <img src={ASSETS.profile} alt="진휘웅" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section section--alt" id="about">
        <div className="section-inner">
          <FadeIn><p className="section-label">About me</p></FadeIn>
          <FadeIn delay={0.05}><h2 className="section-title">Expertise</h2></FadeIn>
          <div className="about-grid">
            <FadeIn delay={0.1}>
              <div className="about-card">
                <div className="about-card-title">Education</div>
                <ul className="about-list">
                  <li>
                    <span className="about-date">2019.03 — 2025.02</span>
                    <span className="about-item-title">가천대학교</span>
                    <br />경제학과 전공 · 컴퓨터공학과 전공
                  </li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="about-card">
                <div className="about-card-title">Awards</div>
                <ul className="about-list">
                  {[
                    { date: '2024.07', title: '가천대학교 TMI — 우수' },
                    { date: '2024.06', title: '6th Ne(o)rdinary 해커톤 — 최우수' },
                    { date: '2024.05', title: '가천대학교 공모전을 부탁해 — 장려상' },
                    { date: '2024.05', title: '가천대학교 창업아이디어대회 — 최우수' },
                    { date: '2024.01', title: '가천대학교 학습공동체 — 우수' },
                  ].map((a, i) => (
                    <li key={i}>
                      <span className="about-date">{a.date}</span>
                      <span className="about-item-title">{a.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="about-card">
                <div className="about-card-title">Activities</div>
                <ul className="about-list">
                  {[
                    { date: '2024.02 — 2025.02', title: '구름톤 유니브 중앙 운영진' },
                    { date: '2024.03 — 2024.08', title: 'UMC (IT 연합동아리)' },
                    { date: '2023.09 — 2024.02', title: 'Tave (IT 연합동아리)' },
                    { date: '2023.03 — 2023.06', title: '전국경제인연합회 EIC' },
                  ].map((a, i) => (
                    <li key={i}>
                      <span className="about-date">{a.date}</span>
                      {a.title}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="about-card">
                <div className="about-card-title">Language & Certificate</div>
                <ul className="about-list">
                  <li>
                    <span className="about-date">2024.05.19 취득</span>
                    <span className="about-item-title">토익스피킹 150 (IH)</span>
                  </li>
                  <li>
                    <span className="about-date">2025.03.21 취득</span>
                    <span className="about-item-title">ADsP — 한국데이터산업진흥원</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="section-inner">
          <FadeIn><p className="section-label">Career</p></FadeIn>
          <FadeIn delay={0.05}><h2 className="section-title">Work Experience.</h2></FadeIn>
          <div className="timeline">
            {WORK_EXPERIENCE.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-meta">
                    <span className="timeline-date">{item.date}</span>
                    <span className="timeline-badge">{item.company}</span>
                  </div>
                  <div className="timeline-role">{item.role}</div>
                  <ul className="timeline-bullets">
                    {item.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section section--alt" id="projects">
        <div className="section-inner">
          <FadeIn><p className="section-label">Portfolio</p></FadeIn>
          <FadeIn delay={0.05}><h2 className="section-title">다양한 프로젝트 팀장</h2></FadeIn>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="section-inner">
          <FadeIn><p className="section-label">Tools</p></FadeIn>
          <FadeIn delay={0.05}><h2 className="section-title">Skill</h2></FadeIn>
          <FadeIn delay={0.1}>
            <div className="skills-grid">
              {SKILLS.map((s, i) => (
                <div key={i} className="skill-chip">
                  <img src={s.img} alt={s.name} loading="lazy" />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-watermark">Thank You</div>
        <div className="footer-inner">
          <p className="footer-label">Get in touch</p>
          <h2 className="footer-title">
            진휘웅의 포트폴리오를<br />봐주셔서 감사합니다.
          </h2>
          <div className="footer-contacts">
            <div>
              <div className="footer-contact-label">Email</div>
              <div className="footer-contact-value">
                <a href="mailto:matt7695@naver.com">matt7695@naver.com</a>
              </div>
            </div>
            <div>
              <div className="footer-contact-label">Phone</div>
              <div className="footer-contact-value">010-8948-7695</div>
            </div>
            <div>
              <div className="footer-contact-label">Project</div>
              <div className="footer-contact-value">
                <a href="https://bon-fe.vercel.app/" target="_blank" rel="noreferrer">bon-fe.vercel.app</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 진휘웅 · JHW Portfolio</span>
            <span>가천대학교 경제학과 · 컴퓨터공학과</span>
          </div>
        </div>
      </footer>
    </>
  );
}
