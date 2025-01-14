import { Typography } from '@mui/material';
import { CATEGORY } from 'services/models/contants/Category';
import { COLORS } from 'services/models/contants/Colors';
import { TRAIT } from 'services/models/contants/Traits';
import '../../assets/styles/TraitCategory.css'

type PropsTraits = {
    category: string
}
export default function TraitCategory({category}:PropsTraits) {
    if (category === CATEGORY.SOCIAL)
        return (
            <div className='traits'>
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.RED}}>{TRAIT.CONFIDENT},</Typography>
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.GREEN}}>{TRAIT.AUTHENTIC},</Typography>
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.BLUE}}>{TRAIT.FUN}</Typography>
            </div>
        
        );
    if (category === CATEGORY.BUSINESS)
        return (
            <div className='traits'>
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.GREEN}}>{TRAIT.COMPETENT},</Typography>
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.BLUE}}>{TRAIT.LIKEBLE},</Typography>
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.RED}}>{TRAIT.INFLUENTIAL}</Typography>
            </div>
        );
    if (category === CATEGORY.DATING)
        return (
            <div className='traits' >
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.BLUE}}>{TRAIT.SMART},</Typography>,
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.GREEN}}>{TRAIT.TRUSTWORTHY},</Typography>
                <Typography style={{fontSize:32, textAlign:'center', fontFamily:'Roboto, sans-serif',color: COLORS.RED}}>{TRAIT.ATTRACTIVE}</Typography>
            </div>
        )
    return <Typography></Typography>
}
