import React, {useEffect, useState} from 'react';
import {AddSongPage, AuthorType as AuthorResponseType} from "../song/AddSongForm";
import {AddSongObjectType, authorsAPI, SongQueryObjectType, songsAPI, SongUpdateObjectType} from "../../api/api";
import {makeStyles} from '@material-ui/core/styles';
import {QuerySongForm} from "../song/QuerySongForm";
import {Button, Paper} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import SongTable from '../song/SongTable';
import {ErrorMessageObjectType, showMessage} from "../utils/helper";
import {Alert} from "@material-ui/lab";
import AddAuthorForm from "../author/AddAuthorForm";
import ModalForm from "../common/modal/ModalForm";
import AddSongFormik from "../song/AddSongFormik";


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
    formButtonBlock: {
        marginTop: "15px",
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

/* Получить все песни определенного исполнителя или нескольких исполнителей.*/
/* Получить выборку песен или исполнителей по части их названия.*/
/* Получить выборку песен или исполнителей по дате внесения записи.*/
/* Получить часть выборки песен или исполнителей. Например,
    10 песен, идущих после первых 20-и от начала выборки.
*/

export const SongPage: React.FC = () => {

    const classes = useStyles();
    const [songArray, setSongArray] = useState<Array<SongType>>([]);
    const [authorArray, setAuthorArray] = useState<Array<AuthorResponseType>>([]);
    const [error, setError] = useState<ErrorMessageObjectType | undefined>(undefined);

    const [modalEditStatus, setModalEditStatus] = useState(false);

    async function getAllSongs(queryObject?: SongQueryObjectType) {
        try {
            let response = await songsAPI.getAllSong(queryObject);
            setSongArray(response.data);
        } catch (err) {
            showMessage("Nothing found", 3000, "error", setError );
            console.log('Something went wrong', err);
        }
    }

    async function getAllAuthors() {
        try {
            let response = await authorsAPI.getAllAuthor()
            setAuthorArray(response.data)
        } catch (err) {
            showMessage("Something went wrong", 3000, "error", setError );
            console.log(err);
        }
    }


    useEffect(() => {
        getAllSongs();
        getAllAuthors();
    }, [])

    const handleSubmit = (queryObject: SongQueryObjectType) => {
        getAllSongs(queryObject);
    }

    const handleDeleteSong = (uuid: string) => {
        songsAPI.deleteSong(uuid)
            .then(res => {
                showMessage("Song deleted successfully", 3000, "success", setError );
                getAllSongs();
            })
            .catch(err => {
                showMessage(err.response?.data?.error || "Something went wrong", 3000, "error", setError );
                console.log('Something went wrong', err);
            })
    }

    const handleUpdateSong = (uuid: string, updatedObject: SongUpdateObjectType) => {
        songsAPI.updateSong(uuid, updatedObject)
            .then(res => {
                showMessage("Song updated successfully", 3000, "success", setError );
                getAllSongs();
            })
            .catch(err => {
                showMessage(err.response?.data?.error || "Something went wrong", 3000, "error", setError );
                console.log('Something went wrong', err);
            })
    }

    const handleAddSong = (songObject: AddSongObjectType) => {
        songsAPI.addSong(songObject)
            .then(res => {
                showMessage("Song added successfully", 3000, "success", setError );
                getAllSongs();
            })
            .catch(err => {
                showMessage(err.response?.data?.error || "Something went wrong", 3000, "error", setError );
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
                                    {
                                        error && (<Alert severity={error?.messageType || "warning"}>{error?.message}</Alert>)
                                    }
                                    <Button
                                        variant={'contained'}
                                        className={classes.formButtonBlock}
                                        color={'primary'}
                                        onClick={() => {
                                            setModalEditStatus(true)
                                        }}
                                    >
                                        Add Song
                                    </Button>
                                    <ModalForm
                                        modalTitle={"Add song"}
                                        actionButtonTitle={"Add"}
                                        openStatus={modalEditStatus}
                                        handleCloseModal={setModalEditStatus}
                                        removeActionBlock={true}
                                    >
                                          <AddSongFormik
                                              handleCloseModal={setModalEditStatus}
                                              handleAddSong={handleAddSong}
                                              authorArray={authorArray}
                                          />

                                    </ModalForm>
                                </div>
                            </Typography>
                        </Grid>
                        <Grid
                            item
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