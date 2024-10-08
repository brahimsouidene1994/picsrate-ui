import React from 'react';
import PictureService from '../../services/api/picture';
export default function Home() {
    React.useEffect(()=>{
        PictureService.test()
    },[])
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
