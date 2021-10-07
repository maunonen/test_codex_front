import React from 'react';
import { useHistory} from 'react-router-dom';
import {
    AppBar,
    Button, createStyles,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {PATH} from "../router/Routes";

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
    const history = useHistory()
    const classes = useStyles()

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
