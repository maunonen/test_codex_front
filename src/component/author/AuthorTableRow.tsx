import React, {useState} from 'react'
import {Button, TableCell, TableRow, TextField} from "@material-ui/core";
import moment from "moment";
import ModalForm from "../common/modal/ModalForm";
import {UpdateAuthorObjectType} from "../../api/api";
import {AuthorType} from "../song/AddSongForm";

export interface SongTableRowPropsType {
    author: AuthorType
    handleDeleteCallback: (uuid: string) => void
    handleUpdateCallback: (uuid: string, updatedObject: UpdateAuthorObjectType) => void
}

export const AuthorTableRow: React.FC<SongTableRowPropsType> = (props) => {
    const {handleDeleteCallback, handleUpdateCallback, author} = props;

    const [modalEditStatus, setModalEditStatus] = useState(false);
    const [name, setName] = useState<string>(author.name);
    const [label, setLabel] = useState<string>(author.label);

    const handleEditAuthor = (songUuid: string) => {
        const updatedObject: UpdateAuthorObjectType = {
            ...(name !== '' && {
                name
            }),
            ...(label !== '' && {
                label
            }),
        }
        console.log(updatedObject);
        handleUpdateCallback && handleUpdateCallback(songUuid, updatedObject);
    }

    const handleNameUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleLabelUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value)
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {author.name}
            </TableCell>
            <TableCell align="right">{author.label}</TableCell>
            <TableCell align="right">{moment(author.createdAt).format("DD.MM.YYYY")}</TableCell>
            <TableCell align="right">
                <Button
                    type={'submit'}
                    variant={'contained'}
                    onClick={() => {
                        handleDeleteCallback && handleDeleteCallback(author.uuid)
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
                    modalTitle={"Edit author"}
                    actionButtonTitle={"Edit"}
                    openStatus={modalEditStatus}
                    handleCloseModal={setModalEditStatus}
                    modalActionCallback={() => {
                        handleEditAuthor(author.uuid)
                    }}
                >
                    <>
                        <TextField
                            value={name === null ? author.name : name}
                            onChange={handleNameUpdate}
                            margin="dense"
                            label="Author name"
                            type="string"
                            fullWidth
                        />
                        <TextField
                            value={label === null ? author.label : label}
                            onChange={handleLabelUpdate}
                            margin="dense"
                            label="Label"
                            type="string"
                            fullWidth
                        />
                    </>
                </ModalForm>
            </TableCell>
        </TableRow>
    )
}
export default AuthorTableRow
