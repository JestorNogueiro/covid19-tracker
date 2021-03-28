import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import './infoBox.css'
const InfoBox = ({title, cases,active,isRed, totalCases, ...props}) => {
 return (
  <Card onClick={props.onClick} className={`infoBox ${active && "info--selected"} ${isRed && "infoBox--red"}`}>
   <CardContent>
    <Typography color='textSecondary'>
     {title}
    </Typography>
    <h2 className={`infoBox__cases ${!isRed && "infoBox--green"}`}>{cases}</h2>
    <Typography className=" infoBox__totalCases" color='primary'>{totalCases} Total</Typography>
   </CardContent >
  </Card>
 )
}

export default InfoBox
