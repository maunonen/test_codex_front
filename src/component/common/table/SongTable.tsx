import React from 'react';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {SongType} from "../../pages/SongPage";
import moment from "moment";

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
    handleDeleteCallback: (uuid: string) => void
}

const SongTable: React.FC<SongTablePropsType> = (props) => {
    const {songArray, handleDeleteCallback} = props;
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
                        <TableRow
                            key={song.uuid}
                            /*sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/
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
                                    /*className={classes.formButtonBlock}*/
                                    color={'primary'}>
                                    Delete
                                </Button>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    /*className={classes.formButtonBlock}*/
                                    color={'primary'}>
                                    Update
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default SongTable;