import React, { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  withStyles, 
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid, Paper, Box } from "@material-ui/core";
import "./FundingDetail.css"
import { getFundDetail } from '../../api/fund';
import FullWidthTabs from "../../components/fundComponent/FullWidthTabs";
import { FundForm } from '../../common/types';
import { useParams } from "react-router-dom";
import { Height } from "@material-ui/icons";



const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  })
)(LinearProgress);


const FundingDetail = () => {

  const [Fund, setFund] = useState<FundForm>();
  interface Params {
    fund_id: string;
  }
  const params: Params = useParams();
  interface Props {
    fundInfo: FundForm | undefined;
  }




    
  useEffect(() => {
    console.log('fundDetailPage');
    getFundDetail(Number(1)).then((response) => {
      setFund(response.data);
    });
  }, [params]);

    console.log("hihi");
    console.log({Fund});
 

  

  
    return (
      <div  >

        <div className="fundingHeader" style={{   background: "url({Fund?.fundingThumbnail})"}}>
            <h3 className="fundingText">{Fund?.fundingName}</h3>
            <h5 className="fundingText">이번달의 소녀를 공식 후원하고 1집 데뷔앨범을 선착순으로 수령해보세요</h5>

            <div className="row">
                <div className="col-md-8 imgArea" style={{position:"relative", top:"50px", left:"20px", height:"400px", alignItems: "center" ,overflow:"hidden"}} >
                <img width="100%" src={Fund?.fundingThumbnail}></img>
                </div>
                <div className="col-md-4" style={{position:"relative", top:"130px", paddingRight:"30px"}}>
                
                
                <table style={{width:"100%"}} >
              <tr>
                <td><h5>{Fund?.fundingName}</h5></td>
                <td style={{textAlign:"right"}}><h5>70%</h5></td>
                  </tr>
            </table>
            <BorderLinearProgress variant="determinate" value={70} />
          
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
            <a id="logoAnchor" href="1234/payment">
                <Button variant="contained" color="primary">
                  펀딩하기
                </Button>
              </a>
              </Box>

            </div>
            </div>
        </div>
        <div>
        <FullWidthTabs></FullWidthTabs>
        </div>

      
        
      </div>
    );
  }


export default FundingDetail;