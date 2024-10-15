import { Box, Typography } from "@mui/material";
import { IOSSlider } from "./MStyledUi";

type SliderProps = {
    label: string,
    handleChange: Function,
    color_bar: string
}
const marks = [
    {
        value: 1,
        label: 'No',
    },
    {
        value: 3,
        label: 'Bad',
    },
    {
        value: 5,
        label: 'Average',
    },
    {
        value: 7,
        label: 'Good',
    },
    {
        value: 9,
        label: 'Excellent',
    }
];

function valuetext(value: number) {
    return `${value}`;
}


export default function Slider({ label, handleChange,color_bar}: SliderProps) {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        handleChange(newValue as number);
    };
    return (
        <Box sx={{ width: '70%', marginTop: '40px', display: 'flex' }}>
            <Typography sx={{ width: '30%', fontSize: '1.5rem', fontFamily: 'Roboto, sans-serif' }}>{label}</Typography>
            <IOSSlider
                sx={{ width: '70%' }}
                aria-label="Custom marks"
                defaultValue={5}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                getAriaValueText={valuetext}
                shiftStep={1}
                step={1}
                min={1}
                max={10}
                marks={marks}
                color_bar={color_bar}         
                />
        </Box>
    )
}