import axios from "axios";
import PictureObject from "../models/picture";

const getPicturesByCurrentUser = async (token:string):Promise<PictureObject[]> => {
    let picturesOfCurrentUser: PictureObject[]=[];
    let url = `${process.env.REACT_APP_API}/api/picture/getAllByUser`
    console.log("register ", url)
    try {
        await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
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
const patchPictureStatus = async (idPicture:string, status:boolean,token:string):Promise<void> => {
    let url = `${process.env.REACT_APP_API}/api/picture/updatestatus/${idPicture}`
    console.log("register ", url)
    try {
        await axios.patch(url,{ status: status },
            {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            },
        )
            .then(response => {
                console.log('picture updated')
            });
    } catch (error) {
        console.warn(error);
    };
}

const saveNewPicture = async (pictureData:FormData,token:string):Promise<PictureObject|null> => {
    let newPicture:PictureObject|null=null ;
    let url = `${process.env.REACT_APP_API}/api/picture/add`
    console.log("register ", url)
    try {
        await axios.post(url, pictureData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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

const getOnePicture = async(id:string,token:string):Promise<PictureObject|null>=>{
    let picture: PictureObject|null = null;
    let url=`${process.env.REACT_APP_API}/api/picture/getOnePicture/${id}`
    console.log("register ", url)
    try{
        await axios.get(url,
        {
            headers : {
                Authorization: `Bearer ${token}`
            }
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

const deletePicture = async (id:string,token:string):Promise<void>=>{
    let url = `${process.env.REACT_APP_API}/api/picture/delete/${id}`
    console.log("register ", url)
    try{
        await axios.delete(url,
        {
            headers : {
                Authorization: `Bearer ${token}`
            }
        },
        )
        .then(response=>{
            //console.log(response.data)
        })
    }catch(error){
        console.log(error)
    }
}

const getRandomPictureOfOthers = async (token:string):Promise<PictureObject|null> => {
    let randomPicture:PictureObject|null = null;
    let url=`${process.env.REACT_APP_API}/api/picture/getOneRandomPicture`
    console.log("register ", url)
    try {
        await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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

const test = async (token:string):Promise<void> => {
    let url=`${process.env.REACT_APP_API_GET_TEST}`
    console.log("test url ", url)
    try {
        await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
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
