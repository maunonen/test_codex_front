import React from 'react'
import {NavLink, useHistory, useParams} from 'react-router-dom'
/*import s from './Header.module.css'*/
/*import {PATH} from "../Routes";*/
import {
    AppBar,
    Button, createStyles,
    IconButton,
    LinearProgress,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
/*import {Menu} from "@material-ui/icons";*/
import {useDispatch, useSelector} from "react-redux";
import {PATH} from "../router/Routes";

/*import {AppStoreType} from "../../m2-bll/redux/store";*/

/*import { logoutTC } from '../../m2-bll/redux/auth-reducer';*/

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        backgroundColor: "#EBE0E9",

    },
    toolbar :  {
       display : "flex",
       justifyContent : "space-between",
    },
    listBlock: {
        display: "flex",
        flexDirection: "row"
    },
    iconBlock: {},
    menuItem: {
        color: "#2D2E46",
    }
}))

const Header: React.FC = () => {
    /*const {appStatus} = useSelector((state: AppStoreType) => state.app)*/
    const history = useHistory()
    const classes = useStyles()
    /*const dispatch = useDispatch()*/
    /*const isLoggedIn = useSelector<AppStoreType, boolean>((state) => state.auth.isLoggedIn)*/


    return (
        <div>
            <AppBar
                position="static"
                className={classes.root}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h1">
                        Codex Test
                    </Typography>
                    <div>
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.SONGS)}
                        >Songs</Button>

                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.AUTHORS)}
                        >Authors</Button>
                    </div>
                </Toolbar>
                {/*{appStatus === 'loading' && <LinearProgress color={"secondary"}/>}*/}
            </AppBar>
        </div>
    )
}

export default Header
