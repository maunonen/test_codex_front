import React, {useState} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useHistory} from "react-router-dom";
import {
    Button, Card, createStyles, FormControl, FormGroup,
    Grid, makeStyles, TextField, Theme, Typography,
} from "@material-ui/core";
import {authorsAPI, NewAuthorObjectType} from "../../api/api";
import {PATH} from "../router/Routes";
import {Alert} from "@material-ui/lab";


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

export interface AddAuthorFormPropsType {
    handleAddAuthor: (authorObject: NewAuthorObjectType) => void
}

const AddAuthorForm: React.FC<AddAuthorFormPropsType> = (props) => {
    const {handleAddAuthor} = props;
    const classes = useStyles()

    const restoreSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        label: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            label: '',
        },
        validationSchema: restoreSchema,
        onSubmit: (values) => {
            const authorObject: NewAuthorObjectType = {
                name: values.name,
                label: values.label
            }
            handleAddAuthor && handleAddAuthor(authorObject);
            formik.resetForm();
        },
    })

    return (

        <Grid>
            <form onSubmit={formik.handleSubmit}>
                <FormControl className={classes.displayStretch}>
                    <FormGroup className={classes.textFieldArea}>
                            <TextField
                                /*className={classes.addAuthorField}*/
                                type="text"
                                label="Name"
                                margin="dense"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name &&
                            <div style={{color: 'red'}}>{formik.errors.name}</div>
                            }
                            <TextField
                                /*className={classes.addAuthorField}*/
                                type="text"
                                label="Label"
                                margin="dense"
                                {...formik.getFieldProps('label')}
                            />
                            {formik.touched.label && formik.errors.label &&
                            <div style={{color: 'red'}}>{formik.errors.label}</div>
                            }
                            <div className={classes.formButtonBlock}>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    className={classes.formButtonBlock}
                                    color={'primary'}>
                                    Add Author
                                </Button>
                            </div>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    )
}
export default AddAuthorForm
