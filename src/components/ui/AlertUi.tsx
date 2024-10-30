import { Alert } from "@mui/material";

type PropsAlert={
    updateResponse: boolean,
    message: string,
    handleVisibility: Function
}
export default function AlertUi({updateResponse, message, handleVisibility}:PropsAlert){
    return(
        <Alert severity={updateResponse?"success":"error"} onClose={() => { handleVisibility(false) }} sx={{ position: 'absolute', top: -80, width: '70%', height: '80px' }}>
            {message}
        </Alert>
    )

}