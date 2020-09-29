export interface Viewer {
    id: string | null;
    token: string | null;
    avatar: string | null;
    hasWallet: string | null;
    didRequest: boolean;
}