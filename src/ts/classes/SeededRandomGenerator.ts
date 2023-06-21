import type RandomGenerator from "@/ts/interfaces/RandomGenerator";

export default class SeededRandomGenerator implements RandomGenerator {
    private currentValue: bigint;

    constructor(seed: bigint) {
        this.currentValue = seed;
    }

    next() {
        return this.currentValue = this.currentValue * 16807n % 2147483647n;
    }
}
