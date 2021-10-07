import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
/*import RangeShowCard from './RangeShowCard';*/
import {useDispatch, useSelector} from "react-redux";

import {Card, Paper} from "@material-ui/core";
/*import DeckTable from "../../common/c8-Table/DeckTable";*/
/*import Search from './Search';*/
import Typography from "@material-ui/core/Typography";
import {QuerySongForm} from "../query/QuerySongForm";
import SongTable from '../common/table/SongTable';
import {AddSongObjectType, authorsAPI, SongQueryObjectType, songsAPI, SongUpdateObjectType} from "../../api/api";
import {AddSongPage, AuthorType as AuthorResponseType} from "../query/AddSongForm";



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "40px",
        marginBottom: "40px",
        minWidth: 750,
    },
    paper: {
        margin: 'auto',
        maxWidth: 1200,
    },
    filterBlock: {
        backgroundColor: "#ECECF9",
        maxWidth: "250px",
        padding: "30px",
        flexGrow: 1,
    },
    mainBlock: {
        width: "fit-content",
        flexGrow: 3,
        margin: "30px",
        maxWidth: "950px",
        boxSizing: "border-box",
    },
    mainSearchBlock: {
        marginBottom: "20px",
    },
    mainSearchHeader: {
        marginBottom: "20px",
    },

}));

export interface SongType {
    uuid: string
    title: string
    duration: number
    createdAt: string
    updatedAt: string
    author: AuthorType
}

export interface AuthorType {
    uuid: string
    name: string
    label: string
}

const songArray: Array<SongType> = [
    {
        uuid: "12760b38-b681-45dc-9c5c-0eca12994d16",
        title: "15",
        duration: 450,
        createdAt: "2021-10-06T14:23:08.313Z",
        updatedAt: "2021-10-06T14:23:08.313Z",
        author: {
            uuid: "72dd26ca-9131-44b5-beac-614adbb6e4d2",
            name: "Radiohead 3",
            label: "some label 2"
        }
    },
    {
        uuid: "66f3230b-9393-4cac-99fd-858a40d9fefe",
        title: "60",
        duration: 450,
        createdAt: "2021-10-06T14:23:13.154Z",
        updatedAt: "2021-10-06T14:23:13.154Z",
        author: {
            uuid: "72dd26ca-9131-44b5-beac-614adbb6e4d2",
            name: "Radiohead 3",
            label: "some label 2"
        }
    },
    {
        uuid: "076881ab-8fec-4ddb-a58c-05110228c2a8",
        title: "nude",
        duration: 450,
        createdAt: "2021-10-06T14:23:17.091Z",
        updatedAt: "2021-10-06T14:23:17.091Z",
        author: {
            uuid: "72dd26ca-9131-44b5-beac-614adbb6e4d2",
            name: "Radiohead 3",
            label: "some label 2"
        }
    }
]

/* Получить все песни определенного исполнителя или нескольких исполнителей.*/
/* Получить выборку песен или исполнителей по части их названия.*/
/* Получить выборку песен или исполнителей по дате внесения записи.*/
/* Получить часть выборки песен или исполнителей. Например,
    10 песен, идущих после первых 20-и от начала выборки.
*/

export const SongPage: React.FC = () => {

    const classes = useStyles();
    const [songArray, setSongArray] = useState<Array<SongType>>([]);
    const [authorArray , setAuthorArray] = useState<Array<AuthorResponseType>>([]);

    async function getAllSongs(queryObject: SongQueryObjectType | undefined) {
        try {
            let response = await songsAPI.getAllSong(queryObject);
            /*console.log(response.data);*/
            setSongArray(response.data);
        } catch (err) {
            console.log('Something went wrong', err);
        }
    }

    async function  getAllAuthors () {
        try {
            let response = await authorsAPI.getAllAuthor()
            setAuthorArray(response.data)
        } catch (err){
            console.log(err);
        }
    }


    useEffect(() => {
        console.log("Use effect",)
        getAllSongs(undefined);
        getAllAuthors();
    }, [])

    const handleSubmit = (queryObject: SongQueryObjectType) => {
        console.log("From call back", queryObject);
        getAllSongs(queryObject);
    }

    const handleDeleteSong = (uuid: string) => {
        songsAPI.deleteSong(uuid)
            .then(res => {
                console.log("Song has been deleted");
                getAllSongs(undefined);
            })
            .catch(err => {
                console.log('Something went wrong', err);
            })
    }

    const handleUpdateSong = (uuid : string, updatedObject : SongUpdateObjectType) => {
        songsAPI.updateSong(uuid, updatedObject)
            .then(res => {
                console.log("Song has been deleted");
                getAllSongs(undefined);
            })
            .catch(err => {
                console.log('Something went wrong', err);
            })
    }

    const handleAddSong = ( songObject : AddSongObjectType) => {
        songsAPI.addSong(songObject)
            .then(res => {
                console.log("Song has been deleted");
                getAllSongs(undefined);
            })
            .catch(err => {
                console.log('Something went wrong', err);
            })
    }

    return (
        <div className={classes.root}>
            <Paper
                elevation={4}
                className={classes.paper}
                square={false}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    <Grid
                        item
                        className={classes.filterBlock}
                    >
                        <QuerySongForm
                            handleSubmitCallBack={handleSubmit}
                        />
                    </Grid>
                    <Grid
                        item
                        className={classes.mainBlock}
                    >
                        <Grid
                            item
                            className={classes.mainSearchBlock}
                            alignItems={"stretch"}
                        >
                            <Typography
                                variant={"h2"}
                                className={classes.mainSearchHeader}
                            >
                                List of song
                                <div>
                                <AddSongPage
                                    authorArray={authorArray}
                                    handleAddSongCallBack={handleAddSong}
                                />

                                </div>
                            </Typography>
                            {/*<QuerySongForm/>*/}
                        </Grid>
                        <Grid
                            item
                            /*className={classes.mainTableBlock}*/
                            alignItems={"stretch"}
                        >
                            <SongTable
                                songArray={songArray}
                                authorArray={authorArray}
                                handleDeleteCallback={handleDeleteSong}
                                handleUpdateCallback={handleUpdateSong}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default SongPage