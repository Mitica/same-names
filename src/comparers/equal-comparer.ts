import { NameComparer } from "./comparer";

export class EqualComparer extends NameComparer {
    compare(name1: string, name2: string, _lang?: string): number {
        if (name1 === name2) {
            return 1;
        }
        if (name1.split(/\s+/).length > 1 && name1.toLowerCase() === name2.toLowerCase()) {
            return 0.9;
        }

        return 0;
    }
}
