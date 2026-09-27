import { HeroSection } from './HeroSection';
import { OpenDebates } from './OpenDebates';
import { PopularSummariesSection } from './PopularSummariesSection';
import { RecentPosts } from './RecentPosts';
import * as s from './Landing.css';

/** 로그아웃 첫 화면 (E안): 소개, 모집 중인 토론방, 많이 읽는 요약, 게시글 */
export function LandingHome() {
  return (
    <div className={s.page}>
      <HeroSection />
      <OpenDebates />
      <PopularSummariesSection />
      <RecentPosts />
    </div>
  );
}
