export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    instutions: {
      overview: '/dashboard/instutions',
      addInstution: '/dashboard/instutions/add',
    },
    trainers: {
      overview: '/dashboard/trainers',
      addTrainer: '/dashboard/trainers/add',
    },
    Session: {
      overview: '/dashboard/Session',
      addInstution: '/dashboard/Session/add',
    },
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors' },
} as const;
