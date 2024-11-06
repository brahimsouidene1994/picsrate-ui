import axios from "axios";
   
const scanPicture = async (imgUrl: File, category:string): Promise<number> => {
    console.log("scanPicture ")
    let scan:number = 0
    let formData = new FormData();
    formData.append('media', imgUrl);
    formData.append('models', `${process.env.REACT_APP_AI_SCAN_MODELS}`);
    formData.append('api_user', `${process.env.REACT_APP_AI_SCAN_API_USER}`);
    formData.append('api_secret', `${process.env.REACT_APP_AI_SCAN_API_SECRET}`);

    const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
    };

    try {
        await axios.post(`${process.env.REACT_APP_AI_SCAN_API}`, formData,config)
            .then(response => {
                if (response.status === 200 && response.data)
                    console.log(response.data)
                    scan = validateImage(response.data, category)
            });
        
    } catch (error) {
        console.warn(error);
    };
    return scan;
}

const validateImage = (response:any, category:string):number => {
    console.log("validateImage")
    const { nudity } = response;
  
    // Condition 1: If fully naked (e.g., high nudity levels), reject the picture
    const isFullyNude = nudity.sexual_activity > 0.5 || nudity.sexual_display > 0.5 || nudity.erotica > 0.5;
    if (isFullyNude) {
      return 0;
    }
  
    return 1;
  };

export default {
    scanPicture
};