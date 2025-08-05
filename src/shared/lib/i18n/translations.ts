export interface Translations {
  common: {
    loading: string;
    error: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    search: string;
    close: string;
    confirm: string;
    back: string;
    next: string;
    previous: string;
  };
  navigation: {
    home: string;
    users: string;
    events: string;
    communities: string;
    logs: string;
  };
  auth: {
    signIn: string;
    signOut: string;
    email: string;
    password: string;
    rememberMe: string;
    loginFailed: string;
    loading: string;
  };
  users: {
    name: string;
    email: string;
    handle: string;
    role: string;
    accessLevel: string;
    status: string;
    joinDate: string;
    actions: string;
    searchPlaceholder: string;
    usersPerPage: string;
    totalUsers: string;
    active: string;
    inactive: string;
    deleteConfirm: string;
    editUser: string;
    noUsers: string;
    lastLogin: string;
    columnSettings: string;
    resetColumns: string;
    reset: string;
    roles: {
      admin: string;
      moderator: string;
      user: string;
    };
    accessLevels: {
      owner: string;
      manager: string;
      nonManager: string;
    };
  };
  errors: {
    networkError: string;
    unauthorized: string;
    forbidden: string;
    notFound: string;
    serverError: string;
  };
}

export const translations: Record<string, Translations> = {
  ko: {
    common: {
      loading: '로딩 중...',
      error: '오류',
      save: '저장',
      cancel: '취소',
      delete: '삭제',
      edit: '수정',
      create: '생성',
      search: '검색',
      close: '닫기',
      confirm: '확인',
      back: '뒤로',
      next: '다음',
      previous: '이전',
    },
    navigation: {
      home: '홈',
      users: '사용자',
      events: '이벤트',
      communities: '커뮤니티',
      logs: '로그',
    },
    auth: {
      signIn: '로그인',
      signOut: '로그아웃',
      email: '이메일',
      password: '비밀번호',
      rememberMe: '로그인 정보 기억하기',
      loginFailed: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      loading: '로그인 중...',
    },
    users: {
      name: '이름',
      email: '이메일',
      handle: '핸들',
      role: '역할',
      accessLevel: '접근 레벨',
      status: '상태',
      joinDate: '가입일',
      actions: '작업',
      searchPlaceholder: '사용자 검색...',
      usersPerPage: '페이지당:',
      totalUsers: '사용자',
      active: '활성',
      inactive: '비활성',
      deleteConfirm: '{name} 사용자를 삭제하시겠습니까?',
      editUser: '사용자 수정',
      noUsers: '등록된 사용자가 없습니다.',
      lastLogin: '마지막 로그인',
      columnSettings: '컬럼 설정',
      resetColumns: '컬럼 초기화',
      reset: '초기화',
      roles: {
        admin: '관리자',
        moderator: '모더레이터',
        user: '사용자',
      },
      accessLevels: {
        owner: '소유자',
        manager: '관리자',
        nonManager: '일반',
      },
    },
    errors: {
      networkError: '네트워크 오류가 발생했습니다.',
      unauthorized: '인증이 필요합니다.',
      forbidden: '접근 권한이 없습니다.',
      notFound: '페이지를 찾을 수 없습니다.',
      serverError: '서버 오류가 발생했습니다.',
    },
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      close: 'Close',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
    },
    navigation: {
      home: 'Home',
      users: 'Users',
      events: 'Events',
      communities: 'Communities',
      logs: 'Logs',
    },
    auth: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember me',
      loginFailed: 'Login failed. Please check your email and password.',
      loading: 'Signing in...',
    },
    users: {
      name: 'Name',
      email: 'Email',
      handle: 'Handle',
      role: 'Role',
      accessLevel: 'Access Level',
      status: 'Status',
      joinDate: 'Join Date',
      actions: 'Actions',
      searchPlaceholder: 'Search users...',
      usersPerPage: 'Per page:',
      totalUsers: 'users',
      active: 'Active',
      inactive: 'Inactive',
      deleteConfirm: 'Are you sure you want to delete {name}?',
      editUser: 'Edit User',
      noUsers: 'No users found.',
      lastLogin: 'Last Login',
      columnSettings: 'Column Settings',
      resetColumns: 'Reset Columns',
      reset: 'Reset',
      roles: {
        admin: 'Admin',
        moderator: 'Moderator',
        user: 'User',
      },
      accessLevels: {
        owner: 'Owner',
        manager: 'Manager',
        nonManager: 'Non-Manager',
      },
    },
    errors: {
      networkError: 'Network error occurred.',
      unauthorized: 'Authentication required.',
      forbidden: 'Access denied.',
      notFound: 'Page not found.',
      serverError: 'Server error occurred.',
    },
  },
};
