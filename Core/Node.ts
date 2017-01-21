export default class Node {
    id: string;
    degree: number = 0;
    color: string;

    constructor(id: string) {
        this.id = id;
    }

    equals(other: Node) {
        return other.id == this.id;
    }
}