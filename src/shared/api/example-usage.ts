// API 사용 예시
import {
  signIn,
  fetchUsers,
  fetchEvents,
  fetchCommunities,
  getApiUrl,
} from './index';

// 1. 인증 예시
export async function loginExample() {
  try {
    await signIn('user@example.com', 'password123');
    console.log('로그인 성공!');
  } catch (error) {
    console.error('로그인 실패:', error);
  }
}

// 2. 사용자 목록 조회 예시
export async function getUsersExample() {
  try {
    const users = await fetchUsers({
      take: 10,
      page: 1,
      search: 'john',
    });
    console.log('사용자 목록:', users);
  } catch (error) {
    console.error('사용자 조회 실패:', error);
  }
}

// 3. 이벤트 목록 조회 예시
export async function getEventsExample() {
  try {
    const events = await fetchEvents({
      take: 20,
      page: 1,
      search: 'conference',
      sort: 'createdAt',
      order: 'desc',
    });
    console.log('이벤트 목록:', events);
  } catch (error) {
    console.error('이벤트 조회 실패:', error);
  }
}

// 4. 커뮤니티 목록 조회 예시
export async function getCommunitiesExample() {
  try {
    const communities = await fetchCommunities({
      take: 15,
      page: 1,
      search: 'tech',
    });
    console.log('커뮤니티 목록:', communities);
  } catch (error) {
    console.error('커뮤니티 조회 실패:', error);
  }
}

// 5. API URL 확인 예시
export function checkApiUrl() {
  const apiUrl = getApiUrl();
  console.log('현재 API URL:', apiUrl);
  return apiUrl;
}
