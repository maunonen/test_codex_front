import React, {useState} from 'react'
import {Button, FormControl, Input, InputLabel, NativeSelect, TableCell, TableRow, TextField} from "@material-ui/core";
import moment from "moment";
import ModalForm from "../common/modal/ModalForm";
import {SongType} from "../pages/SongPage";
import {SongUpdateObjectType} from "../../api/api";
import {AuthorType} from "./AddSongForm";

export interface SongTableRowPropsType {
    song: SongType
    authorArray: Array<AuthorType>
    handleDeleteCallback: (uuid: string) => void
    handleUpdateCallback: (uuid: string, updatedObject: SongUpdateObjectType) => void
}

export const SongTableRow: React.FC<SongTableRowPropsType> = (props) => {
    const {song, handleDeleteCallback, handleUpdateCallback, authorArray} = props;

    const [modalEditStatus, setModalEditStatus] = useState(false);
    const [title, setTitle] = useState<string>(song.title);
    const [duration, setDuration] = useState<number>(song.duration);
    const [authorUuid, setAuthorUuid] = useState<string>(song.author.uuid);

    const handleEditSong = (songUuid: string) => {
        const updatedObject: SongUpdateObjectType = {
            ...(title !== '' && {
                title
            }),
            ...((duration && isFinite(+duration)) && {
                duration: Number(duration)
            }),
            ...(authorUuid !== '' && {
                authorUuid
            }),
        }
        console.log(updatedObject);
        handleUpdateCallback && handleUpdateCallback(songUuid, updatedObject);
    }

    const handleTitleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const handleDurationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/\D+/.test(event.target.value)) return;
        setDuration(Number(+event.target.value));
    }
    const handleAuthorCheckBoxChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAuthorUuid(event.target.value as string);
    };

    return (
        <TableRow
            key={song.uuid}
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
                    color={'primary'}>
                    Delete
                </Button>
                <Button
                    type={'submit'}
                    variant={'contained'}
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
                        <FormControl>
                            <InputLabel htmlFor="demo-customized-select-native">Author</InputLabel>
                            <NativeSelect
                                placeholder={"Author"}
                                value={authorUuid}
                                onChange={handleAuthorCheckBoxChange}
                                input={<Input/>}
                            >
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
        </TableRow>
    )
}
export default SongTableRow
