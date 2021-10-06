import React, {KeyboardEventHandler, useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            flexGrow: 1,
        },
        formButtonBlock : {
            display: "flex",
            alignItems: "center",
        },
        filterHeader: {
            marginBottom: "20px",
        },
        search: {
            display: "flex",
            alignItems: "stretch",
            backgroundColor: "#e2dfef",
            marginBottom: "15px",
        },
        searchInputBlock: {
            flexDirection: "column",
            flexGrow: 3,
        },
        addDeckBlock: {
            marginLeft: "20px",
        }
    }),
);

export const QuerySongForm: React.FC = () => {

    /* Получить все песни определенного исполнителя или нескольких исполнителей.*/
    /* Получить выборку песен или исполнителей по части их названия.*/
    /* Получить выборку песен или исполнителей по дате внесения записи.*/
    /* Получить часть выборки песен или исполнителей. Например,
        10 песен, идущих после первых 20-и от начала выборки.
    */
    const classes = useStyles();
    /*const dispatch = useDispatch()*/
    /*const [search, setSearch] = React.useState('');*/

    const [songName, setSongName] = useState<string>('');
    const [songDate, setSongDate] = useState<string>('');
    const [authorName, setAuthorName] = useState<string>('');
    const [offset, setOffset] = useState<string>('');
    const [limit, setLimit] = useState<string>('');

    /*const [name, setName] = useState<string>('first deck updated')
    const [path, setPath] = useState<string>('')
    const [grade, setGrade] = useState<number>(0)
    const [shots, setShots] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)
    const [deckCover, setDeckCover] = useState<string>('')
    const [privateDeck, setPrivateDeck] = useState<boolean>(false)
    const [modalAddStatus, setModalAddStatus] = useState<boolean>(false);
    const [packName, setPackName] = useState<string>('')*/

    /*const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };*/

    /*const handleAddPAck = () => {
        if (packName) {
            let newObject = {
                name : packName
            }
            dispatch(addNewPackTC(newObject))
        }
    }*/

    /*const handlePackNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackName(event.target.value)
    }*/

    return (
        <div>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <Grid
                    item
                    className={classes.searchInputBlock}
                >
                    <Typography
                        variant={"h2"}
                        className={classes.filterHeader}
                    >
                        Filter songs
                    </Typography>
                    <TextField
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="Song name"
                        placeholder="Song name"
                        variant="outlined"
                    />
                    <TextField
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="Author"
                        placeholder="Song name"
                        variant="outlined"
                    />
                    <TextField
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="Start from"
                        placeholder="start from"
                        variant="outlined"
                    />
                    <TextField
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="Chunk size"
                        placeholder="chunk size"
                        variant="outlined"
                    />
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        className={classes.formButtonBlock}
                        color={'primary'}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
