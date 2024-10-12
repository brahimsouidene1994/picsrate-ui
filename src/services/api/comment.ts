import axios, { AxiosRequestConfig } from "axios";
import authHeader from "./auth-header";
import CommentObject from "../models/comment";

const saveNewComment = async (commentData:CommentObject):Promise<void> => {
    let headers:AxiosRequestConfig['headers'] = await authHeader();
    let url = `${process.env.REACT_APP_API_SAVE_COMMENT}`
    console.log("register ", url)
    try {
        await axios.post(url, commentData,
            {
                headers: headers
            },
        )
            .then(() => {
                 console.log('comment saved')
            });
    } catch (error) {
        console.warn(error);
    };
}

const getAllCommentOfPicture= async (idPicture:string):Promise<CommentObject[]> => {
    let headers:AxiosRequestConfig['headers'] = await authHeader();
    let commentsOfCurrentPicture: CommentObject[]=[];
    let url = `${process.env.REACT_APP_API_GET_ALL_COMMENT}/${idPicture}`
    console.log("register ->", url)
    try {
        await axios.get(url,
            {
                headers: headers
            },
        )
            .then(response => {
                if(response.status === 200 && response.data){
                    commentsOfCurrentPicture = response.data;
                }
            });
    } catch (error) {
        console.warn(error);
    };
    return commentsOfCurrentPicture;
}
export default {
    saveNewComment,
    getAllCommentOfPicture
};