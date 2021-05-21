import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FundingNotice } from '../../common/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

interface Props{
  notice:FundingNotice;
}
const AccordionComp=(props: Props)=> {
  const classes = useStyles();
  const [fundingNotice, setFundingNotice] = useState<FundingNotice>();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> {props?.notice.fundingNoticeTitle}</Typography>
          <br></br><hr></hr>
          <p>{props?.notice.userNickname}</p>
        </AccordionSummary>
        <AccordionDetails className="contentArea" style={{backgroundColor:"#fefefe"}}>
        <div style={{wordBreak:"break-all"}} dangerouslySetInnerHTML={ {__html: props?.notice.fundingNoticeContent} }></div>
      
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionComp;