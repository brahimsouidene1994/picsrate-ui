import { Alert } from "@mui/material";

type PropsAlert={
    updateResponse: boolean,
    message: string,
    handleVisibility: Function,
    top:string,
    height: string,
    width: string
}
export default function AlertUi({updateResponse, message, handleVisibility, top, height, width}:PropsAlert){
    return(
        <Alert severity={updateResponse?"success":"error"} onClose={() => { handleVisibility(false) }} sx={{ position: 'absolute', top: top, width: width, height: height }}>
            {message}
        </Alert>
    )

}