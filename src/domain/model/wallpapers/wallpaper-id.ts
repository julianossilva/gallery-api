import { isUUID } from "@utils/assertions";

export class InvalidWallpaperIDError extends Error {}

export class WallpaperID {
    public readonly value: string;

    constructor(value: string) {
        if (!isUUID(value)) throw new InvalidWallpaperIDError();
        this.value = value;
    }

    equal(other: WallpaperID): boolean {
        return this.value == other.value;
    }
}
