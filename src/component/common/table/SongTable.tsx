import React, {useState} from 'react';
import {
    Button, FormControl, Input, InputLabel, NativeSelect,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import {SongType} from "../../pages/SongPage";
import moment from "moment";
import ModalForm from "../modal/ModalForm";
import {AddSongObjectType, SongUpdateObjectType} from "../../../api/api";
import {AuthorType} from "../../query/AddSongForm";
import SongTableRow from "./SongTableRow";

function createData(
    title: string,
    author: string,
    createdAt: string,
    duartion: number,
) {
    return {title, author, createdAt, duartion};
}

const rows = [
    createData('15 step', 'radioheade', '2020-05-05', 140),
    createData('15 step', 'radioheade', '2020-05-05', 140),
    createData('15 step', 'radioheade', '2020-05-05', 140),
    createData('15 step', 'radioheade', '2020-05-05', 140),
    createData('15 step', 'radioheade', '2020-05-05', 140),
];

export interface SongTablePropsType {
    songArray: Array<SongType>
    authorArray : Array<AuthorType>
    handleDeleteCallback: (uuid: string) => void
    handleUpdateCallback: (uuid: string, updatedObject: SongUpdateObjectType) => void
}

const SongTable: React.FC<SongTablePropsType> = (props) => {
    const {songArray, handleDeleteCallback, handleUpdateCallback, authorArray} = props;
    const [modalEditStatus, setModalEditStatus] = useState(false);
    const [title, setTitle] = useState<string | null>(null)
    const [duration, setDuration] = useState<string | null>(null)
    const [authorUuid, setAuthorUuid] = useState<string | null>(null)

    const handleEditSong = (songUuid: string) => {
        const updatedObject: SongUpdateObjectType = {
            ...(title !== '' && {
                title
            }),
            ...((duration !== '' && duration && isFinite(+duration)) && {
                duration: Number(duration)
            }),
            ...(authorUuid !== '' && {
                authorUuid
            }),
        }
        handleUpdateCallback && handleUpdateCallback(songUuid, updatedObject);
    }
    const handleTitleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const handleDurationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(event.target.value)
    }
    /*const handleAuthorUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorUuid(event.target.value)
    }*/
    const handleAuthorCheckBoxChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAuthorUuid(event.target.value as string);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Author</TableCell>
                        <TableCell align="right">Duration</TableCell>
                        <TableCell align="right">CreatedAt</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songArray.map((song) => (
                        <SongTableRow
                            key={song.uuid}
                            song={song}
                            handleDeleteCallback={handleDeleteCallback}
                            handleUpdateCallback={handleUpdateCallback}
                            authorArray={authorArray}
                        />
                        /*<TableRow
                            key={song.uuid}
                            /!*sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*!/
                        >
                            <TableCell component="th" scope="row">
                                {song.title}
                            </TableCell>
                            <TableCell align="right">{song.author && song.author.name}</TableCell>
                            <TableCell align="right">{song.duration}</TableCell>
                            <TableCell align="right">{moment(song.createdAt).format("DD.MM.YYYY")}</TableCell>
                            <TableCell align="right">
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    onClick={() => {
                                        handleDeleteCallback && handleDeleteCallback(song.uuid)
                                    }}
                                    /!*className={classes.formButtonBlock}*!/
                                    color={'primary'}>
                                    Delete
                                </Button>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    /!*className={classes.formButtonBlock}*!/
                                    onClick={() => {
                                        setModalEditStatus(true)
                                    }}
                                    color={'primary'}>
                                    Update
                                </Button>
                                <ModalForm
                                    modalTitle={"Edit song"}
                                    actionButtonTitle={"Edit"}
                                    openStatus={modalEditStatus}
                                    handleCloseModal={setModalEditStatus}
                                    modalActionCallback={() => {
                                        handleEditSong(song.uuid)
                                    }}
                                >
                                    <>
                                        <TextField
                                            value={title === null ? song.title : title}
                                            onChange={handleTitleUpdate}
                                            margin="dense"
                                            label="Title"
                                            type="string"
                                            fullWidth
                                        />
                                        <TextField
                                            value={duration === null ? song.duration : duration}
                                            onChange={handleDurationUpdate}
                                            margin="dense"
                                            label="Duration"
                                            type="string"
                                            fullWidth
                                        />
                                        <TextField
                                            value={authorUuid === null ? song.author.uuid : authorUuid}
                                            onChange={handleAuthorUpdate}
                                            margin="dense"
                                            label="Author"
                                            type="string"
                                            fullWidth
                                        />
                                        <FormControl
                                            className={classes.search}
                                        >
                                            <InputLabel htmlFor="demo-customized-select-native">Author</InputLabel>
                                            <NativeSelect
                                                placeholder={"Author"}
                                                value={authorUuid}
                                                onChange={handleAuthorCheckBoxChange}
                                                input={<Input/>}
                                            >
                                                <option aria-label="None" value="Author"/>
                                                {
                                                    authorArray && authorArray.map(author => {
                                                        return <option value={author.uuid}>{author.name}</option>
                                                    })
                                                }
                                            </NativeSelect>
                                        </FormControl>
                                    </>
                                </ModalForm>
                            </TableCell>
                        </TableRow>*/
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default SongTable;