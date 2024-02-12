import * as React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Path, Use, Defs } from 'react-native-svg';
import { theme } from '../../constants';

const MeterSvg = ({ color = '#FFFFFF' }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" fill='none'>
        <Rect width={34} height={34} fill={theme.colors.blue2} rx={6} />
        <Use href="#icon1" x="17%" y="17%" />
        <Defs>
            <Path
                id="icon1"
                stroke={theme.colors.white}
                strokeWidth={5}
                strokeLinecap='round'
                strokeLinejoin='round'
                transform='scale(0.17)'
                d="M18,128h92a4,4,0,0,0,4-4V4a4,4,0,0,0-4-4H18a4,4,0,0,0-4,4V124A4,4,0,0,0,18,128ZM18,4h9V16a2,2,0,0,0,4,0V4H97V56H31V26a2,2,0,0,0-4,0V66a4,4,0,0,0,4,4H97a4,4,0,0,0,4-4V4h9V124H18ZM97,60v6H31V60Z"
            />
        </Defs>
    </Svg>
);

export default MeterSvg;