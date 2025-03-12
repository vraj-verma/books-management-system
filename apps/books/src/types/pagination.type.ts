export class Paged {

    offset: number;
    limit: number;
    search: string;

    constructor(offset: number, limit: number, search: string) {
        this.offset = offset;
        this.limit = limit;
        this.search = search = ''
    }

    
}