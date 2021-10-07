import React, {useState} from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {SongType} from "../pages/SongPage";
import {SongUpdateObjectType} from "../../api/api";
import {AuthorType} from "./AddSongForm";
import SongTableRow from "./SongTableRow";

export interface SongTablePropsType {
    songArray: Array<SongType>
    authorArray : Array<AuthorType>
    handleDeleteCallback: (uuid: string) => void
    handleUpdateCallback: (uuid: string, updatedObject: SongUpdateObjectType) => void
}

const SongTable: React.FC<SongTablePropsType> = (props) => {
    const {songArray, handleDeleteCallback, handleUpdateCallback, authorArray} = props;
    /*const [modalEditStatus, setModalEditStatus] = useState(false);
    const [title, setTitle] = useState<string | null>(null)
    const [duration, setDuration] = useState<string | null>(null)
    const [authorUuid, setAuthorUuid] = useState<string | null>(null)*/

    /*const handleEditSong = (songUuid: string) => {
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
    }*/
    /*const handleTitleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }*/
    /*const handleDurationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(event.target.value)
    }*/

    /*const handleAuthorCheckBoxChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAuthorUuid(event.target.value as string);
    };*/

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
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default SongTable;