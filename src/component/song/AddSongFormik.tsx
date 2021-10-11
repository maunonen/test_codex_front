import React from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup';
import {
    Button, createStyles, FormControl, FormGroup, FormHelperText,
    Grid, Input, makeStyles, NativeSelect, TextField, Theme,
} from "@material-ui/core";
import {AddSongObjectType, NewAuthorObjectType} from "../../api/api";
import {AuthorType} from "./AddSongForm";


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        width: "413px",
    },
    formTitle: {
        marginBottom: "30px",
    },
    formSubtitle: {
        marginBottom: "40px",
    },
    formDescription: {
        marginBottom: "40px",
    },
    formButtonBlock: {
        marginTop: "15px",
    },
    textFieldArea: {
        margin: "0px 10px",
        display: "flex"
    },
    addAuthorField: {
        flexGrow: 1,
    },
    displayStretch: {
        display: "flex",
        alignItems: "stretch"
    },
}))

export interface AddSongFormikPropsType {
    handleAddSong: (authorObject: AddSongObjectType) => void
    handleCloseModal?: (openStatus: boolean) => void
    authorArray: AuthorType[]
}

const AddAuthorForm: React.FC<AddSongFormikPropsType> = (props) => {
    const {handleAddSong, handleCloseModal, authorArray} = props;
    const classes = useStyles()

    const addSongSchema = Yup.object().shape({
        title: Yup.string().required('Name is required'),
        duration: Yup.number(),
        authorUuid: Yup.string().required('Please choose Author field')

    });

    const formik = useFormik({
        initialValues: {
            title: '',
            duration: 0,
            authorUuid: '',
        },
        validationSchema: addSongSchema,
        onSubmit: (values) => {
            const authorObject: AddSongObjectType = {
                title: values.title,
                duration: values.duration,
                authorUuid: values.authorUuid
            }
            handleCloseModal && handleCloseModal(false);
            handleAddSong && handleAddSong(authorObject);
            formik.resetForm();
        },
    })

    return (
        <Grid>
            <form onSubmit={formik.handleSubmit}>
                <FormControl className={classes.displayStretch}>
                    <FormGroup className={classes.textFieldArea}>
                        <TextField
                            name={"title"}
                            type="text"
                            label="Title"
                            margin="dense"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <TextField
                            name={"duration"}
                            type="text"
                            label="Duration"
                            margin="dense"
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                            helperText={formik.touched.duration && formik.errors.duration}
                        />
                        <FormControl>
                            <NativeSelect
                                name={"authorUuid"}
                                aria-label={"Author"}
                                placeholder={"Author"}
                                input={<Input/>}
                                value={formik.values.authorUuid}
                                onChange={formik.handleChange}
                                error={formik.touched.authorUuid && Boolean(formik.errors.authorUuid)}
                            >
                                <option value={""}>{"--Choose Author"}</option>
                                {
                                    authorArray && authorArray.map(author => {
                                        return <option value={author.uuid}>{author.name}</option>
                                    })
                                }
                            </NativeSelect>
                        </FormControl>
                        <FormHelperText>{formik.touched.authorUuid && formik.errors.authorUuid}</FormHelperText>
                        <div className={classes.formButtonBlock}>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={classes.formButtonBlock}
                                color={'primary'}>
                                Add Song
                            </Button>
                        </div>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    )
}
export default AddAuthorForm
