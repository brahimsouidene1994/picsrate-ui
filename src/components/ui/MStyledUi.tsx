import { LinearProgress, linearProgressClasses, LinearProgressProps, Slider, SliderTypeMap, styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

interface CustomLinearProgressProps extends LinearProgressProps {
    start_gradiant?: string;
    end_gradiant?: string;
    gradiant_color?: string
}

export const BorderLinearProgress = styled(LinearProgress)<CustomLinearProgressProps>(({ theme, gradiant_color }) => ({
    height: 35,
    borderRadius: 50,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#D9D9D9",
        transition: 'box-shadow 0.3s ease', // Smooth transition for box-shadow
        '&:hover ': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Box shadow effect on hover
        },
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 50,
        // background: `linear-gradient(90deg, ${start_gradiant}, ${end_gradiant})`,
        background: gradiant_color,
        ...theme.applyStyles('dark', {
            // background: `linear-gradient(90deg, ${start_gradiant}, ${end_gradiant})`,
            background: gradiant_color
        }),
    },
}));

export const ProgressText = styled('span')({
    position: 'absolute',
    transform: 'translate(50%, -90%)',
    color: '#fff',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    fontFamily: 'Alice',
    fontSize: 32
});

export const NoteText = styled('span')({
    color: '#1A314C',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.2rem',
    borderBottom: '1px solid #d9d9d9',
    textTransform: 'capitalize',
});

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.grey,
        color: '#fff',
        boxShadow: theme.shadows[1],
        fontSize: 16,
    },
}));

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

interface CustomSliderTypeMap{
  color_bar?: string
}  

export const IOSSlider = styled(Slider)<CustomSliderTypeMap>(({ theme, color_bar }) => ({
    color: color_bar,
    height: 12,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 32,
      width: 32,
      backgroundColor: color_bar,
      boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
      border: '3px solid #fff',
      '&:focus, &:hover, &.Mui-active': {
        boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
      '&:before': {
        boxShadow:
          '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 20,
      fontWeight: 'normal',
      top: -6,
      backgroundColor: 'unset',
      color: theme.palette.text.primary,
      '&::before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: '#000',
        ...theme.applyStyles('dark', {
          color: '#fff',
        }),
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
      height: 12,
    },
    '& .MuiSlider-rail': {
      opacity: 0.5,
      boxShadow: 'inset 0px 0px 4px -2px #000',
      backgroundColor: '#d0d0d0',
    },
    ...theme.applyStyles('dark', {
      color: '#0a84ff',
    }),
  }));