export namespace main {
	
	export class Channel {
	    id: number;
	    name: string;
	    url: string;
	    category: string;
	    favorite: boolean;
	    playlistId: number;
	
	    static createFrom(source: any = {}) {
	        return new Channel(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.url = source["url"];
	        this.category = source["category"];
	        this.favorite = source["favorite"];
	        this.playlistId = source["playlistId"];
	    }
	}
	export class Playlist {
	    id: number;
	    name: string;
	    url: string;
	    createdAt: string;
	    updatedAt: string;
	
	    static createFrom(source: any = {}) {
	        return new Playlist(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.url = source["url"];
	        this.createdAt = source["createdAt"];
	        this.updatedAt = source["updatedAt"];
	    }
	}

}

