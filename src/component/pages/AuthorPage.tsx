import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useDispatch, useSelector} from "react-redux";

import {Card, Paper} from "@material-ui/core";
/*import DeckTable from "../../common/c8-Table/DeckTable";*/
/*import Search from './Search';*/
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "40px",
        marginBottom: "40px",
        minWidth: 750,
    },
    paper: {
        margin: 'auto',
        maxWidth: 1200,
    },
    filterBlock: {
        backgroundColor: "#ECECF9",
        maxWidth: "250px",
        padding: "30px",
        flexGrow: 1,
    },
    mainBlock: {
        width: "fit-content",
        flexGrow: 3,
        margin: "30px",
        maxWidth: "950px",
        boxSizing: "border-box",
    },
    mainSearchBlock: {
        marginBottom: "20px",
    },
    mainSearchHeader: {
        marginBottom: "20px",
    },

}));

export const AuthorPage: React.FC = () =>  {
    const classes = useStyles();
    /*const {_id} = useSelector((state: AppStoreType) => state.auth);
    const pack = useSelector((state: AppStoreType) => state.pack);*/
    /*const dispatch = useDispatch();*/

    return (
        <div className={classes.root}>
            <Paper
                elevation={4}
                className={classes.paper}
                square={false}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    <Grid
                        item
                        className={classes.mainBlock}
                    >
                        <Grid
                            item
                            className={classes.mainSearchBlock}
                            alignItems={"stretch"}
                        >
                            <Typography
                                variant={"h2"}
                                className={classes.mainSearchHeader}
                            >
                                Author page
                            </Typography>
                            {/*<Search/>*/}
                        </Grid>
                        <Grid
                            item
                            /*className={classes.mainTableBlock}*/
                            alignItems={"stretch"}
                        >
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
