import React, { Component } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ButtonBase from '@material-ui/core/ButtonBase';
import browserHistory from "../../utils/browserHistory";

export default class ListActions extends Component {
    tileData = [
        {
            img: "https://material-ui.com/static/images/grid-list/breakfast.jpg",
            title: 'Image',
            author: 'author',
            cols: 2,
        },
    ]

    render() {
        let styles = {
            gridList: {
                width: "80%",
                margin: "30px auto 0",
                lineHeight: "160px",
                textAlign: "center",
            },
            tile: {
                height: "100%",
                width: "100%",
                backgroundColor: "#4932B3",
                color: "#fff",
                fontSize: 20,
            },
        }
        return (
            <div>
                <GridList cellHeight={160} style={styles.gridList} cols={5}>
                    <GridListTile cols={3}>
                        <ButtonBase
                            focusRipple
                            style={styles.tile}
                            onClick={()=>browserHistory.push("/staff/accounts")}
                        >
                            Accounts
                        </ButtonBase>
                    </GridListTile>
                    <GridListTile cols={2}>
                        <ButtonBase
                            focusRipple
                            style={styles.tile}
                            onClick={()=>browserHistory.push("/staff/certificates")}
                        >
                            Certificates
                        </ButtonBase>
                    </GridListTile>
                </GridList>
            </div>
        )
    }
}
