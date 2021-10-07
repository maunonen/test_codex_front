import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {UpdateAuthorObjectType} from "../../api/api";
import {AuthorType} from "../song/AddSongForm";
import AuthorTableRow from "./AuthorTableRow";

export interface SongTablePropsType {
    authorArray: Array<AuthorType>
    handleDeleteCallback: (uuid: string) => void
    handleUpdateCallback: (uuid: string, updatedObject: UpdateAuthorObjectType) => void
}

const AuthorTable: React.FC<SongTablePropsType> = (props) => {
    const {handleDeleteCallback, handleUpdateCallback, authorArray} = props;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Author name</TableCell>
                        <TableCell align="right">Label</TableCell>
                        <TableCell align="right">CreatedAt</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {authorArray.map((author) => (
                        <AuthorTableRow
                            author={author}
                            handleDeleteCallback={handleDeleteCallback}
                            handleUpdateCallback={handleUpdateCallback}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default AuthorTable;