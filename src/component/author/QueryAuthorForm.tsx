import React, { useState} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {Button, FormControl, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import {muiTheme} from "../common/theme/theme";
import { QueryAuthorsObjectType} from "../../api/api";
import {AuthorType} from "../pages/AuthorPage";


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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 190,
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 190,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export interface QueryAuthorFormPropsType {
    authorArray: Array<AuthorType>
    handleSubmitCallBack: (songQueryObject: QueryAuthorsObjectType) => void
}

export const QueryAuthorForm: React.FC<QueryAuthorFormPropsType> = (props) => {

    const {handleSubmitCallBack, authorArray} = props

    const classes = useStyles();

    const [createdAt, setCreatedAt] = React.useState<string>('');
    const [authorName, setAuthorName] = useState<string>('');
    const [offset, setOffset] = useState<string>('');
    const [limit, setLimit] = useState<string>('');
    const [checkedAuthorList, setCheckedAuthorList] = useState<Array<string>>([]);

    const handleAuthorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(event.target.value)
    }
    const handleCreatedAt = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreatedAt(event.target.value);
    };
    const handleOffset = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setOffset(value);
    }
    const handleLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        setLimit(value)
    }

    const handleAuthorListChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCheckedAuthorList(event.target.value as string[]);

    };

    const handleSubmit = () => {
        const querySongObject: QueryAuthorsObjectType = {
            params: {
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
                ...(checkedAuthorList.length > 0 && {
                    authorList: checkedAuthorList
                }),
            }
        }
        handleSubmitCallBack && handleSubmitCallBack(querySongObject);
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
                        Filter authors
                    </Typography>
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
                    <TextField
                        value={createdAt}
                        size={"small"}
                        className={classes.search}
                        style={{backgroundColor: "#ECECF9"}}
                        label="createdAt"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleCreatedAt}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple
                            value={checkedAuthorList}
                            onChange={handleAuthorListChange}
                            input={<Input/>}
                            MenuProps={MenuProps}
                        >
                            {authorArray.map((author) => (
                                <MenuItem
                                    key={author.uuid}
                                    value={author.uuid}
                                    style={getStyles(author.name, checkedAuthorList, muiTheme)}
                                >
                                    {author.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
