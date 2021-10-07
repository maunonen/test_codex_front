import React, {useEffect, useState} from 'react';
import {AddSongPage, AuthorType as AuthorResponseType} from "../song/AddSongForm";
import {
    AddSongObjectType,
    authorsAPI, NewAuthorObjectType,
    QueryAuthorsObjectType,
    SongQueryObjectType,
    songsAPI,
    SongUpdateObjectType, UpdateAuthorObjectType
} from "../../api/api";
import {makeStyles} from '@material-ui/core/styles';
import {QuerySongForm} from "../song/QuerySongForm";
import {Paper} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import SongTable from '../common/table/SongTable';
import AuthorTable from "../common/table/AuthorTable";


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

/* Получить все песни определенного исполнителя или нескольких исполнителей.*/
/* Получить выборку песен или исполнителей по части их названия.*/
/* Получить выборку песен или исполнителей по дате внесения записи.*/
/* Получить часть выборки песен или исполнителей. Например,
    10 песен, идущих после первых 20-и от начала выборки.
*/

export const AuthorPage: React.FC = () => {

    const classes = useStyles();
    const [authorArray, setAuthorArray] = useState<Array<AuthorResponseType>>([]);

    async function getAllAuthors( queryObject? : QueryAuthorsObjectType) {
        try {
            let response = await authorsAPI.getAllAuthor(queryObject)
            setAuthorArray(response.data)
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getAllAuthors();
    }, [])

    const handleSearch = (queryObject: QueryAuthorsObjectType) => {
        getAllAuthors(queryObject);
    }

    const handleDeleteAuthor = (uuid: string) => {
        authorsAPI.deleteAuthor(uuid)
            .then(res => {
                console.log("Author has been deleted");
                getAllAuthors();
            })
            .catch(err => {
                console.log('Something went wrong', err);
            })
    }

    const handleUpdateAuthor = (uuid: string, updatedObject: UpdateAuthorObjectType) => {
        authorsAPI.updateAuthor(uuid, updatedObject)
            .then(res => {
                getAllAuthors();
            })
            .catch(err => {
                console.log('Something went wrong', err);
            })
    }

    const handleAddAuthor = (authorObject: NewAuthorObjectType) => {
        authorsAPI.addAuthor(authorObject)
            .then(res => {
                getAllAuthors();
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
                        {/*<QuerySongForm
                            handleSubmitCallBack={handleSearch}
                        />*/}
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
                                Author Page
                                <div>
                                    {/*<AddSongPage
                                        authorArray={authorArray}
                                        handleAddSongCallBack={handleAddSong}
                                    />*/}

                                </div>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            alignItems={"stretch"}
                        >
                            <AuthorTable
                                authorArray={authorArray}
                                handleDeleteCallback={handleDeleteAuthor}
                                handleUpdateCallback={handleUpdateAuthor}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default AuthorPage