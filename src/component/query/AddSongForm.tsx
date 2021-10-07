import React, {ChangeEventHandler, Dispatch, KeyboardEventHandler, SetStateAction, useEffect, useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
/*import DatePicker from '@mui/lab/DatePicker';*/
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {
    Button,
    Checkbox,
    FormControl, Input,
    InputLabel,
    ListItemText,
    MenuItem,
    NativeSelect,
    Select
} from "@material-ui/core";
import {AddSongObjectType, authorsAPI, SongQueryObjectType} from "../../api/api";


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

export interface AddSongFormPropsType {
    authorArray : AuthorType[]
    handleAddSongCallBack: (songQueryObject: AddSongObjectType) => void
}

export interface AuthorType {
    uuid: string
    name: string
    birthday: string
    label: string
    createdAt: string
    updatedAt: string
    songs : SongType[]
}

export interface SongType {
    uuid: string
    title: string
    duration: number
}



export const AddSongPage: React.FC<AddSongFormPropsType> = (props) => {
    const {handleAddSongCallBack, authorArray} = props

    const classes = useStyles();

    const [songTitle, setSongTitle] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [authorUuid, setAuthorUuid] = useState<string>("b84ccaa0-d897-48e7-9c2b-95bc4905a4ab");
    /*const [authorArray , setAuthorArray] = useState<Array<AuthorType>>([]);*/

    /*useEffect(() => {
        authorsAPI.getAllAuthor(undefined)
            .then(res => {
                console.log(res.data);
                setAuthorArray(res.data);

            })
            .catch(err => {
                console.log(err);
            })
    }, [])*/

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSongTitle(event.target.value)
    }
    const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(event.target.value)
    }
    const handleAuthorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAuthorUuid(event.target.value as string);
    };

    const handleSubmit = () => {
        const addSongObject: AddSongObjectType = {
            title: songTitle, authorUuid,
            ...((duration !== '' && duration && isFinite(+duration)) && {
                duration: Number(duration)
            }),
        }
        handleAddSongCallBack && handleAddSongCallBack(addSongObject)
        console.log(addSongObject);
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
                    {/*<Typography
                        variant={"h2"}
                        className={classes.filterHeader}
                    >
                        Filter songs
                    </Typography>*/}
                    <Grid
                        item
                        justifyContent={"space-between"}
                    >
                        <TextField
                            value={songTitle}
                            size={"small"}
                            /*className={classes.search}*/
                            style={{backgroundColor: "#ECECF9"}}
                            label="Song title"
                            placeholder="Song title"
                            variant="outlined"
                            onChange={handleTitleChange}
                        />
                        <TextField
                            value={duration}
                            size={"small"}
                            /*className={classes.search}*/
                            style={{backgroundColor: "#ECECF9"}}
                            label="Song duration"
                            placeholder="Song duration"
                            variant="outlined"
                            onChange={handleDurationChange}
                        />
                        <FormControl
                            /*className={classes.search}*/
                        >
                            {/*<InputLabel htmlFor="demo-customized-select-native">Author</InputLabel>*/}
                            <NativeSelect
                                placeholder={"Author"}
                                value={authorUuid}
                                onChange={handleAuthorChange}
                                input={<Input/>}
                            >
                                {/*<option aria-label="None" value="Author"/>*/}
                                {
                                    authorArray && authorArray.map(author => {
                                        return <option value={author.uuid}>{author.name}</option>
                                    })
                                }
                            </NativeSelect>
                        </FormControl>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            /*className={classes.formButtonBlock}*/
                            color={'primary'}
                            onClick={handleSubmit}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
