import React, { Component } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import './FundingBoard.css';



const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);


class FundingTerms extends Component {

 

    state = {
      boards: [
        {
          brdno: 1,
          brdwriter: "Lee SunSin",
          brdtitle: "If you intend to live then you die",
          brddate: new Date(),
        },
        {
          brdno: 2,
          brdwriter: "So SiNo",
          brdtitle: "Founder for two countries",
          brddate: new Date(),
        },
      ],
    };
  
    
    render() {
      return (
     
        <div className="container">
            <h2>펀딩 약관</h2>

            <h5>펀딩 약관 영역입니다 펀디는 펀딩을 주관하는 플랫폼입니다.</h5>
            
            </div>
  

       
        
      );
    }
  }
  
  export default FundingTerms;
  