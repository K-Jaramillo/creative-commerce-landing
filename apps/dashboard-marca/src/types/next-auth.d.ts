import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
    brandId?: string | null;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      brandId?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    brandId?: string | null;
  }
}
