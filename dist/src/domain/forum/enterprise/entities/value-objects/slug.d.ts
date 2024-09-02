export declare class Slug {
    value: string;
    private constructor();
    static create(value: string): Slug;
    static createFromText(text: string): Slug;
}
