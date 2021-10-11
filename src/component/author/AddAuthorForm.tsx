import React from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup';
import {
    Button, createStyles, FormControl, FormGroup,
    Grid, makeStyles, TextField, Theme,
} from "@material-ui/core";
import { NewAuthorObjectType} from "../../api/api";


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
    handleCloseModal?: (openStatus: boolean) => void
}

const AddAuthorForm: React.FC<AddAuthorFormPropsType> = (props) => {
    const {handleAddAuthor, handleCloseModal} = props;
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
            handleCloseModal && handleCloseModal(false);
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
