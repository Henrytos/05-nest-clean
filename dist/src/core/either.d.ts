export declare class Left<L, R> {
    readonly value: L;
    constructor(value: L);
    isLeft(): this is Left<L, R>;
    isRight(): this is Right<L, R>;
}
export declare class Right<L, R> {
    readonly value: R;
    constructor(value: R);
    isLeft(): this is Left<L, R>;
    isRight(): this is Right<L, R>;
}
export type Either<L, R> = Left<L, R> | Right<L, R>;
export declare const left: <L, R>(value: L) => Either<L, R>;
export declare const right: <L, R>(value: R) => Either<L, R>;
