export interface StorageService {
    store(path: string, name: string): Promise<void>;
}
