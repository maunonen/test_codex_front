import React, {ChangeEventHandler, Dispatch, KeyboardEventHandler, SetStateAction, useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
/*import DatePicker from '@mui/lab/DatePicker';*/
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@material-ui/core";
import {SongQueryObjectType} from "../../api/api";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            flexGrow: 1,
        },
        formButtonBlock: {
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

export interface QuerySongFormPropsType {
    handleSubmitCallBack: (songQueryObject: SongQueryObjectType) => void
}

export const QuerySongForm: React.FC<QuerySongFormPropsType> = (props) => {
    const {handleSubmitCallBack} = props

    const classes = useStyles();

    const [songTitle, setSongTitle] = useState<string>('');
    const [createdAt, setCreatedAt] = React.useState<string>('');
    /*const [createdAt, setCreatedAt] = React.useState<string>(moment(new Date()).format('YYYY-MM-DD'));*/
    const [authorName, setAuthorName] = useState<string>('');
    const [offset, setOffset] = useState<string>('');
    const [limit, setLimit] = useState<string>('');
    const [authorList, setAuthorList] = useState<Array<string>>(["6a2244a8-6285-456d-a9ed-cd501d94f847"]);

    const handleSongTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSongTitle(event.target.value)
    }
    const handleAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(event.target.value)
    }
    const handleCreatedAt = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreatedAt(event.target.value);
    };

    const handleOffset = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        /*if (!isFinite(+value)) return;*/
        setOffset(value);
    }
    const handleLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        /*if (!isFinite(+value)) return;*/
        setLimit(value)
    }

    const handleSubmit = () => {
        const querySongObject = {
            params: {
                ...(songTitle !== '' && {
                    songTitle
                }),
                ...(authorName !== '' && {
                    authorName
                }),
                ...((limit !== '' && isFinite(+limit)) && {
                    limit: Number(limit)
                }),
                ...((offset !== '' && isFinite(+offset)) && {
                    offset: Number(offset)
                }),
                ...(createdAt !== '' && {
                    createdAtSong: createdAt
                }),
                /*...(authorList !== undefined && {
                    authorList: authorList
                }),*/
            }
        }
        handleSubmitCallBack(querySongObject)
        console.log(querySongObject);
    }

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
                        value={songTitle}
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="Song title"
                        placeholder="Song title"
                        variant="outlined"
                        onChange={handleSongTitleChange}
                    />
                    <TextField
                        value={authorName}
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="Author name"
                        placeholder="Song name"
                        variant="outlined"
                        onChange={handleAuthorNameChange}
                    />
                    <TextField
                        /*type={"number"}*/
                        value={offset}
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="Offset"
                        placeholder="offset"
                        variant="outlined"
                        onChange={handleOffset}
                    />
                    <TextField
                        /*type={"number"}*/
                        value={limit}
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="set limit"
                        placeholder="set limit"
                        variant="outlined"
                        onChange={handleLimit}
                    />
                    <TextField
                        value={createdAt}
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="createdAt"
                        type="date"
                        /*defaultValue="2017-05-24"*/
                        /*defaultValue={moment(new Date()).format('YYYY-MM-DD')}*/
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleCreatedAt}
                    />
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        className={classes.formButtonBlock}
                        color={'primary'}
                        onClick={handleSubmit}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
