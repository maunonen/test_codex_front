import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
})

/**
 * Songs API object type
 * */

export interface AddSongObjectType {
    title: string
    duration?: number
    authorUuid: string
}

export interface SongUpdateObjectType {
    title?: string | null
    duration?: number | null
    authorUuid?: string | null
}

export interface SongQueryObjectType {
    params?: {
        songTitle?: string
        authorName?: string
        limit?: number
        offset?: number
        createdAtSong?: string
        authorList?: Array<string>
    }
}

/**
 * Authors API object type
 * */

export interface NewAuthorObjectType {
    name: string
    label: string
    /*birthday: string*/
}
export interface UpdateAuthorObjectType {
    name?: string
    label?: string
    /*birthday: string*/
}


export interface QueryAuthorsObjectType {
    params?: {
        authorList?: Array<string>
        authorName?: string
        songTitle?: string
        createdAtAuthor?: string
        limit?: number
        offset?: number
    }
}

export const songsAPI = {
    addSong(songObject: AddSongObjectType) {
        return instance.post<any>("/api/songs", songObject);
    },
    deleteSong(uuid: string) {
        return instance.delete<any>(`/api/songs/${uuid}`);
    },
    updateSong(uuid: string, updateObject: SongUpdateObjectType) {
        return instance.put<any>(`/api/songs/${uuid}`, updateObject);
    },
    getAllSong(queryObject?: SongQueryObjectType) {
        return instance.get<any>("/api/songs", queryObject);
    },
    getSongByID(uuid: string) {
        return instance.get<any>("/api/songs", {params: {uuid}});
    },
}

export const authorsAPI = {
    addAuthor(authorObject: NewAuthorObjectType) {
        return instance.post<any>("/api/authors", authorObject);
    },
    deleteAuthor(uuid: string) {
        return instance.delete<any>(`/api/authors/${uuid}`);
    },
    updateAuthor(uuid: string, updateAuthorObject: UpdateAuthorObjectType) {
        return instance.put<any>(`/api/authors/${uuid}`, updateAuthorObject);
    },
    getAllAuthor(queryObject?: QueryAuthorsObjectType) {
        return instance.get<any>("/api/authors", queryObject);
    },
    getAuthorByID(uuid: string) {
        return instance.get<any>(`/api/authors/${uuid}`);
    },
}




