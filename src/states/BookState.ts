export class BookState {
    private _id: number;
    private _title: string;
    private _author: string;
    private _cover_l_url: string;
    private _cover_s_url: string;
    private _link: string;
    private _pub_date: string;
    private _pub_nm: string;
    
    // private _barcode: string;
    // private _category: string;
    // private _description: string;
    // private _ebook_barcode: string;
    // private _isbn: string;
    // private _isbn13: string;
    // private _status_des: string;
    // private _translator: string;
    // private _quantity: number;
    
    constructor( raw: any ) {
        this._id = raw[ "id" ];
        this._title = raw[ "title" ];
        this._author = raw[ "author" ];
        this._cover_l_url = raw[ "cover_l_url" ];
        this._cover_s_url = raw[ "cover_s_url" ];
        this._link = raw[ "link" ];
        this._pub_date = raw[ "pub_date" ];
        this._pub_nm = raw[ "pub_nm" ];
    }

    public get id(): number {
        return this._id;
    }
    public get title(): string {
        return this._title;
    }
    public get author(): string {
        return this._author;
    }
    public get cover_l_url(): string {
        return this._cover_l_url;
    }
    public get cover_s_url(): string {
        return this._cover_s_url;
    }
    public get link(): string {
        return this._link;
    }
    public get pub_date(): string {
        return this._pub_date;
    }
    public get pub_nm(): string {
        return this._pub_nm;
    }
}
