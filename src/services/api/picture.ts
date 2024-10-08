import axios, { AxiosRequestConfig } from "axios";
import PictureObject from "../models/picture";
import authHeader from "./auth-header";

const getPicturesByCurrentUser = async ():Promise<PictureObject[]> => {
    let headers = await authHeader();
    let picturesOfCurrentUser: PictureObject[]=[];
    let url = `${process.env.REACT_APP_API_GET_ALL_PICTURES_CURRENT_USER}`
    console.log("register ", url)
    try {
        await axios.post(url,
            {
                headers: headers,
            },
        )
            .then(response => {
                if(response.status === 200 && response.data)
                    picturesOfCurrentUser = response.data;
            });
    } catch (error) {
        console.warn(error);
    };
    return picturesOfCurrentUser;
}
const patchPictureStatus = async (idPicture:string, status:boolean):Promise<void> => {
    let headers:AxiosRequestConfig['headers'] = await authHeader();
    let url = `${process.env.REACT_APP_API_PATCH_PICTURE_STATUS}` + `${idPicture}`
    console.log("register ", url)
    try {
        await axios.patch(url,{ status: status },
            {
                headers : headers
            },
        )
            .then(response => {
                console.log('picture updated')
            });
    } catch (error) {
        console.warn(error);
    };
}

const saveNewPicture = async (pictureData:FormData):Promise<PictureObject|null> => {
    let newPicture:PictureObject|null=null ;
    let headers:AxiosRequestConfig['headers'] = await authHeader("multipart/form-data");
    let url = `${process.env.REACT_APP_API_SAVE_NEW_PICTURE}`
    console.log("register ", url)
    try {
        await axios.post(url, pictureData,
            {
                headers: headers
            },
        )
        .then(response => {
            if(response.status===200 && response.data)
                newPicture = response.data.object
        });
    } catch (error) {
        console.warn(error);
    };
    return newPicture
}

const getOnePicture = async(id:string):Promise<PictureObject|null>=>{
    
    let picture: PictureObject|null = null;
    let headers:AxiosRequestConfig['headers'] = await authHeader();
    let url=`${process.env.REACT_APP_API_GET_ONE_PICTURE}`+`${id}`
    console.log("register ", url)
    try{
        await axios.get(url,
        {
            headers : headers
        },
        )
        .then(response =>{
            if (response.status===200 && response.data){
                picture = response.data
            }
        });
    }catch (error) {
        console.warn(error);
    };
    return picture;
}

const deletePicture = async (id:string):Promise<void>=>{
    let headers:AxiosRequestConfig['headers'] = await authHeader();
    let url = `${process.env.REACT_APP_API_DELETE_PICTURE}`+`${id}`
    console.log("register ", url)
    try{
        await axios.delete(url,
        {
            headers : headers
        },
        )
        .then(response=>{
            //console.log(response.data)
        })
    }catch(error){
        console.log(error)
    }
}

const getRandomPictureOfOthers = async ():Promise<PictureObject|null> => {
   
    let headers:AxiosRequestConfig['headers'] = await authHeader();
    let randomPicture:PictureObject|null = null;
    let url=`${process.env.REACT_APP_API_GET_RANDOM_PICTURE}`
    console.log("register ", url)
    try {
        await axios.get(url,
            {
                headers: headers
            },
        )
            .then(response => {
                if (response.status === 200 && response.data)randomPicture = response.data;
            });
    } catch (error) {
        console.warn(error);
    };
    return randomPicture;
}

const test = async ():Promise<void> => {
   
    let headers:AxiosRequestConfig['headers'] = await authHeader();
    let url=`${process.env.REACT_APP_API_GET_TEST}`
    console.log("test url ", url)
    try {
        await axios.get(url,
            {
                headers: headers,
            },
        )
            .then(response => {
                if (response.status === 200 && response.data)console.log("test ");
            });
    } catch (error) {
        console.warn(error);
    };
    
}

export default {
    getPicturesByCurrentUser,
    patchPictureStatus,
    getOnePicture,
    saveNewPicture,
    deletePicture,
    getRandomPictureOfOthers,
    test
};
