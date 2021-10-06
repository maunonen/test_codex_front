import React, {Dispatch, KeyboardEventHandler, SetStateAction, useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
/*import DatePicker from '@mui/lab/DatePicker';*/
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

export interface QuerySongFormPropsType {
    /*setSongName : Dispatch<SetStateAction<string>>
    setSongDate : Dispatch<SetStateAction<string>>
    setAuthorName : Dispatch<SetStateAction<string>>
    setOffset : Dispatch<SetStateAction<number | undefined>>
    setLimit : Dispatch<SetStateAction<number | undefined>>*/
    handleSubmitCallBack : () => void
}

export const QuerySongForm: React.FC<QuerySongFormPropsType> = (props) => {
    const { handleSubmitCallBack}  = props

    const classes = useStyles();

    const [songTitle, setSongTitle] = useState<string>('');
    const [createdAt, setCreatedAt] = React.useState<Date | null>(null);
    const [authorName, setAuthorName] = useState<string>('');
    const [offset, setOffset] = useState<number>();
    const [limit, setLimit] = useState<number>();

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

    const handleSongTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSongTitle(event.target.value)
    }
    const handleAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(event.target.value)
    }
    const handleOffset = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOffset(parseInt(event.target.value))
    }
    const handleLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value))
    }
    /*const handleDate = (event : any ) => {
        setCreatedAt(event.target.vale)
    }*/
    const handleSubmit = () => {}

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
                        value={limit}
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="set limit"
                        placeholder="set limit"
                        variant="outlined"
                        onChange={handleLimit}
                    />
                    {/*<DatePicker
                        label="Basic example"
                        value={createdAt}
                        onChange={handleDate}
                        renderInput={(params : any ) => <TextField {...params} />}
                    />*/}
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        className={classes.formButtonBlock}
                        color={'primary'}>
                        Search
                        onChange={handleSubmit}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};
