import { NameComparer } from "./comparer";

export class EqualComparer extends NameComparer {
    compare(name1: string, name2: string): number {
        return name1 === name2 ? 1 : 0;
    }
}
