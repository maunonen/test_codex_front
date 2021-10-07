import React, {useState} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useHistory} from "react-router-dom";
import {
    Button, Card, createStyles, FormControl, FormGroup, Checkbox,
    Grid, makeStyles, TextField, Theme, Typography, FormControlLabel, Link
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
        /*display: "flex",*/
        alignItems: "",
    },
    displayStretch: {
        display: "flex",
        alignItems: "stretch"
    },
    textFieldArea: {
        margin: "0px 10px"
    },
}))

const AddAuthorForm: React.FC = () => {

    const classes = useStyles()
    const history = useHistory()
    const [error, setError] = useState<string | null>(null)

    const restoreSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        label: Yup.string(),
    });


    const showMessage = (message: string, showTime: number) => {
        setError(message)
        setTimeout(() => {
            setError(null)
        }, showTime)
    }


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
            authorsAPI.addAuthor(authorObject)
                .then(res => {
                    console.log("object added", res.data);
                    history.push(PATH.SONGS);
                })
                .catch(err => {
                    console.log('Something went wrong ', err.response?.data?.error);
                    showMessage(err.response?.data?.error, 3000);
                })

            formik.resetForm()
        },
    })

    return <Grid
        container
        justify="center"
        alignItems="center"
        style={{minHeight: '100vh'}}
    >
        <Grid item>
            <Card className={classes.root}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography
                        variant={"h2"}
                        className={classes.formSubtitle}
                    >Add author name</Typography>
                    {
                        error && (<Alert severity="error">{error}</Alert>)
                    }
                    <FormControl className={classes.displayStretch}>
                        <FormGroup className={classes.textFieldArea}>
                            <TextField
                                type="text"
                                label="Name"
                                margin="dense"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name &&
                            <div style={{color: 'red'}}>{formik.errors.name}</div>
                            }
                            <TextField
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
            </Card>
        </Grid>
    </Grid>
}
export default AddAuthorForm
