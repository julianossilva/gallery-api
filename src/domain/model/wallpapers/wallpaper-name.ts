export class InvalidWallpaperNameError extends Error {}

export class WallpaperName {
    public readonly value: string;

    constructor(value: string) {
        if (value.length == 0 || value.length > 200) {
            throw new InvalidWallpaperNameError();
        }
        this.value = value;
    }

    equal(other: WallpaperName): boolean {
        return this.value == other.value;
    }
}
