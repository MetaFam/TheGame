declare module '3box' {
  export interface BoxProfile {
    proof_did?: string;
    collectiblesFavorites?: CollectiblesFavorite[];
    name?: string;
    proof_twitter?: string;
    proof_github?: string;
    coverPhoto?: Image[];
    image?: Image[];
    emoji?: string;
    job?: string;
    employer?: string;
    description?: string;
    year?: string;
    degree?: string;
    school?: string;
    website?: string;
    location?: string;
    memberSince?: string;
  }

  interface CollectiblesFavorite {
    address: string;
    token_id: string;
  }

  interface Image {
    '@type': string;
    contentUrl: {
      '/': string;
    };
  }

  export async function getProfile(ethAddress: string): Promise<BoxProfile>;

  interface VerifiedAccounts {
    did: string;
    github?: {
      proof: string;
      username: string;
    };
    twitter?: {
      proof: string;
      username: string;
    };
  }

  export async function getVerifiedAccounts(
    boxProfile: BoxProfile,
  ): Promise<VerifiedAccounts>;

  interface BoxSpace {
    public: {
      get<T = string>(key: string): Promise<T>;
      set<T = string>(key: string, data: string): Promise<T>;
    };
  }

  interface Box {
    syncDone: Promise<boolean>;
    openSpace: (url: string) => Promise<BoxSpace>;
    twitter?: {
      proof: string;
      username: string;
    };
  }
  export async function openBox(ethAddress: string, web3: unknown): Promise<Box>;
}
