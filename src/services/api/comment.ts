import axios from "axios";
import CommentObject from "../models/comment";

const saveNewComment = async (commentData:CommentObject,token:string):Promise<void> => {
    let url = `${process.env.REACT_APP_API}/api/comment/add`
    console.log("register ", url)
    try {
        await axios.post(url, commentData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
        )
            .then(() => {
                 console.log('comment saved')
            });
    } catch (error) {
        console.warn(error);
    };
}

const getAllCommentOfPicture= async (idPicture:string,token:string):Promise<CommentObject[]> => {
    let commentsOfCurrentPicture: CommentObject[]=[];
    let url = `${process.env.REACT_APP_API}/api/comment/getAllCommentByPicture/${idPicture}`
    console.log("register ->", url)
    try {
        await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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