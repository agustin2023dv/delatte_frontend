export const AUTH_ROUTES = {
    LOGIN: '/(auth)/login',
    FORGOT_PASSWORD: '/(auth)/password/forgot',
    RESET_PASSWORD: '/(auth)/password/reset',
    REGISTER :  '/(auth)/register',
    REGISTER_CUSTOMER :  '/(auth)/register/customer',
    REGISTER_MANAGER :  '/(auth)/register/manager',
    VERIFY_EMAIL: '/(auth)/verify-email',
  } as const;
  