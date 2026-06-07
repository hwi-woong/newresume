import { useEffect, useRef, useState } from 'react';
import './App.css';

/* ──────────────── CONSTANTS ──────────────── */
const WORK_EXPERIENCE = [
  {
    date: '2025.09 — 현재',
    company: '본아이에프',
    role: 'Store Manager',
    tag: 'Internship',
    img: 'images/bonif.jpg',
    imgPosition: 'top center',
    bullets: [
      '매장 관리 및 운영 총괄',
      '매장 운영 효율화를 위한 RAG 기반 챗봇 기획 — SM 월 12~20시간 업무 절감',
      '데이터 분석을 통한 매출 상승 전략 제시',
    ],
  },
  {
    date: '2025.02 — 2025.07',
    company: '페이히어',
    role: 'Sales Management',
    tag: 'Internship',
    img: 'images/payhere.jpg',
    imgPosition: 'top center',
    bullets: [
      '프로모션 기획 및 실행',
      '고객 데이터 이관 작업 (moduSign 활용)',
      '영업 파이프라인 CRM 관리 및 코디네이팅',
    ],
  },
  {
    date: '2024.07 — 2024.12',
    company: '인포뱅크 Icomm',
    role: '기획 인턴',
    tag: 'Internship',
    img: 'images/infobank.jpg',
    imgPosition: 'top center',
    bullets: [
      '카카오 예약 챗봇 운영 및 기획',
      '사용자 관점의 홍보 영상 및 팸플릿 제작 참여',
      '신규 병원 유치 50개 달성',
      'B2B 메시징 서비스 페이지 기획으로 고객 맞춤형 솔루션 제공',
    ],
  },
  {
    date: '2022.04 — 2022.12',
    company: '두산베어스',
    role: '대학생 마케터',
    tag: 'Activity',
    img: 'images/doosan.jpg',
    imgPosition: 'top left',
    bullets: [
      'SNS 콘텐츠 제작 및 마케팅 보조 — BearstV 릴스 제작 참여',
      '구단 대면 행사 기획으로 현장 운영 경험 및 고객 소통 능력 강화',
      '구단 안내데스크 고객 응대 업무',
    ],
  },
];

const ACTIVITIES = [
  {
    date: '2024.02 — 2025.02',
    company: '구름톤 유니브',
    role: '중앙 운영진',
    tag: 'Community',
    img: 'images/goorm.jpg',
    imgPosition: 'center',
    bullets: [
      'ORIENTATION, DANPUNGTHON, ONBOARDING SEMINAR, 9UAP 등 대형 행사 기획·운영',
      '전국 대학생 개발자·기획자·디자이너 커뮤니티 운영',
      '운영진으로서 행사 전반의 기획 및 진행 총괄',
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
    desc: '매장 운영 총괄 및 데이터 분석을 통한 매장 효율 최적화. 고객 응대 자동화를 위한 RAG 기반 챗봇 시스템 기획 및 매출 증대를 위한 매장 운영 효율화 방안을 제안했습니다.',
    bullets: [
      'RAG 기반 운영 매뉴얼 챗봇으로 SM 월 12~20시간 업무 절감',
      '매출 증대를 위한 매장 운영 효율화 방안 제안',
    ],
    link: 'https://bon-fe.vercel.app/',
    notionUrl: 'https://app.notion.com/p/2d45e3b6a71c80db9276e8dd8a7d8a5d',
    img: 'images/bon_project.jpg',
  },
  {
    id: 'ott',
    featured: false,
    period: '23.11 — 24.01',
    tags: ['기획', '프론트개발'],
    title: 'OTT 리뷰 플랫폼 Ottify',
    desc: '원하는 콘텐츠를 어느 OTT에서 볼 수 있는지 한눈에 확인하고, 매니아층을 위한 리뷰·토론 커뮤니티를 제공하는 플랫폼.',
    bullets: [
      '기획자로서 덕후 타겟 니즈 분석 및 차별화 전략 수립',
      '프론트엔드 개발 참여 — React 기반 UI 구현',
    ],
    notionUrl: 'https://app.notion.com/p/1795e3b6a71c81a29718f31c3c5fad19',
    color: '#1a1a4e',
  },
  {
    id: 'studymate',
    featured: false,
    period: '24.03',
    tags: ['기획', '운영', '마케팅'],
    title: '스터디메이트',
    desc: '대학생을 위한 스터디·멘토링 매칭 플랫폼 기획 및 운영. 구름톤 유니브 해커톤 팀 프로젝트.',
    bullets: [
      '팀장으로 개발자·디자이너와 협업',
      '출시 후 인스타 개설·부스 운영 등 마케팅 업무',
      '교내 학습공동체 프로그램 연계 추진',
    ],
    notionUrl: 'https://app.notion.com/p/92da8612621b435aadc92009394e33c9',
    color: '#1e3a5f',
  },
  {
    id: 'ballog',
    featured: false,
    period: '24.06 — 24.08',
    tags: ['기획', 'PM', '커뮤니티'],
    title: 'Ballog (볼로그)',
    desc: '야구 팬들이 직관 일기를 기록하고 다른 팬들과 소통하는 커뮤니티 플랫폼. 15명+ 베타 사용자, 70% 긍정 피드백.',
    bullets: [
      '서비스 기획 및 팀 리딩 — 주간 회의·마일스톤 관리',
      '홍보 전략 수립 및 직접 사용자 모집',
      '피드백 기반 기능 개선 및 디자인 보완',
    ],
    notionUrl: 'https://app.notion.com/p/6bf880cdcd2349f1a2d4b293107ae3b1',
    color: '#1a2e1a',
  },
  {
    id: 'cashtag',
    featured: false,
    period: '24.04 — 24.05',
    tags: ['PM', '기획', '마케팅'],
    title: 'Cash Tag',
    desc: '동아리·단체를 위한 투명한 공동 가계부 서비스. 사용자 중 85%가 직관성에 긍정적 평가.',
    bullets: [
      '서비스 기획·와이어프레임 제작 및 로고 디자인',
      '10명+ 동아리 친구 대상 베타 테스트 진행',
      '피드백 반영한 초기 버전 개선',
    ],
    notionUrl: 'https://app.notion.com/p/0d0dd6768b91403a85703c9f6af79595',
    color: '#1a1a2e',
  },
  {
    id: 'hanga',
    featured: false,
    period: '24.06',
    tags: ['PM', '기획', '해커톤'],
    title: 'Hanga Hanga',
    desc: '도파민 중독 완화를 위한 산책 인증 앱. 사진 업로드로만 산책 종료 — 자연과 가까워지는 건강 습관 형성 서비스.',
    bullets: [
      '아이디어 도출·서비스명 기획 및 IA 설계',
      '개발팀 즉시 착수를 위한 와이어프레임 신속 제작',
      '6th Ne(o)rdinary 해커톤 최우수상 수상',
    ],
    notionUrl: 'https://app.notion.com/p/1075e3b6a71c809ab6e0cf4004ba276e',
    color: '#0d3d26',
  },
];

const SKILLS = [
  { name: 'Notion',  img: 'images/icon_notion.jpeg' },
  { name: 'Teams',   img: 'images/icon_teams.jpeg' },
  { name: 'Jira',    img: 'images/icon_jira.jpeg' },
  { name: 'Slack',   img: 'images/icon_slack.jpeg' },
  { name: 'Python',  img: 'images/icon_python.jpeg' },
  { name: 'Excel',   img: 'images/icon_excel.jpeg' },
  { name: 'Figma',   img: 'images/icon_figma.jpeg' },
];

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

function ExpCard({ item, delay, reverse = false }) {
  return (
    <FadeIn delay={delay} className={`exp-card ${reverse ? 'exp-card--reverse' : ''}`}>
      <div className="exp-card-content">
        <div className="exp-card-meta">
          <span className="exp-card-date">{item.date}</span>
          <span className="exp-card-badge">{item.tag}</span>
        </div>
        <div className="exp-card-company">{item.company}</div>
        <div className="exp-card-role">{item.role}</div>
        <ul className="exp-card-bullets">
          {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
      <div className="exp-card-image">
        <img
          src={item.img}
          alt={item.company}
          loading="lazy"
          style={{ objectPosition: item.imgPosition || 'top center' }}
        />
      </div>
    </FadeIn>
  );
}

function ProjectThumb({ project }) {
  if (project.img) {
    return <img src={project.img} alt={project.title} loading="lazy" />;
  }
  return (
    <div className="project-thumb-placeholder" style={{ background: project.color || '#1e293b' }}>
      <span>{project.title.charAt(0)}</span>
    </div>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      {project.notionUrl && (
        <a href={project.notionUrl} target="_blank" rel="noreferrer" className="project-link project-link--notion">
          자세히 보기 <span>→</span>
        </a>
      )}
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className="project-link project-link--live">
          결과물 보기 <span>↗</span>
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, delay }) {
  if (project.featured) {
    return (
      <FadeIn delay={delay} className="project-card project-card--featured">
        <div className="project-thumb">
          <ProjectThumb project={project} />
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
          <ProjectLinks project={project} />
        </div>
      </FadeIn>
    );
  }
  return (
    <FadeIn delay={delay} className="project-card project-card--regular">
      <div className="project-thumb">
        <ProjectThumb project={project} />
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
        <ProjectLinks project={project} />
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
            <img src="images/profile.jpeg" alt="진휘웅" />
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
          <div className="exp-cards">
            {WORK_EXPERIENCE.map((item, i) => (
              <ExpCard key={i} item={item} delay={i * 0.08} reverse={i % 2 !== 0} />
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="exp-section-divider">
              <p className="section-label" style={{ marginBottom: '0.6rem' }}>Community</p>
              <h3 className="exp-section-subtitle">Activities.</h3>
            </div>
          </FadeIn>
          <div className="exp-cards">
            {ACTIVITIES.map((item, i) => (
              <ExpCard key={i} item={item} delay={i * 0.08} />
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
