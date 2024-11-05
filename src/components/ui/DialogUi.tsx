import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type dialogProps={
    showDialog: boolean;
    deleteResponse: boolean;
    deletePicture: Function;
    deleteResponseMessage: string;
    handleClose: Function;
}
export default function DialogUi({showDialog,handleClose,deleteResponse, deletePicture,deleteResponseMessage}:dialogProps) {

    return (
        <Dialog
            open={showDialog}
            onClose={()=>handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {!deleteResponse ?
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this picture?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>handleClose()} color="primary" autoFocus={true} >
                            Cancel
                        </Button>
                        <Button onClick={() => deletePicture()} color="primary" >
                            Confirm
                        </Button>
                    </DialogActions>
                </React.Fragment>
                :
                <React.Fragment>
                    <DialogTitle id="alert-dialog-title">{"Request Response"}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {deleteResponseMessage}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>handleClose()} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </React.Fragment>
            }
        </Dialog>
    )
}