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