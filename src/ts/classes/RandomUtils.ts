import type RandomGenerator from "@/ts/interfaces/RandomGenerator";

export default class RandomUtils {
    constructor(
        private readonly generator: RandomGenerator,
    ) {}

    randomIndexForArray(array: unknown[]): number | null {
        if (array.length === 0) {
            return null;
        }

        return Number(this.generator.next() % BigInt(array.length));
    }

    randomFromArray<T>(array: T[]): T | null {
        let index = this.randomIndexForArray(array);

        if (index === null) {
            return null;
        }

        return array[index] ?? null;
    }

    shuffleArray<T>(array: T[]): T[] {
        let target = [...array];
        let newArray: T[] = [];

        while (target.length > 0) {
            let index = this.randomIndexForArray(target);

            if (index === null) {
                break;
            }

            newArray.push(target.splice(index, 1)[0]);
        }

        return newArray;
    }
}
