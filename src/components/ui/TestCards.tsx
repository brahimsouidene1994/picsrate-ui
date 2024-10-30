import { Box} from "@mui/material";
import { fakeTests } from "../../utils/FakeData";
import React from "react";
import ImageItem from "./ImageItem";

export default function TestCards() {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex +1) % (fakeTests.length + 1));
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);
    const orderedTests = [
        ...fakeTests.slice(currentIndex),
        ...fakeTests.slice(0, currentIndex),
    ];
    return (
        <Box sx={{ position: 'relative' , width:'40%',height:'70%'}}>
            {orderedTests.map((test, index) => (
                <ImageItem key={test._id} test={test} index={index} isVisible={index < 3}/>
            ))}
        </Box>
    );
}

