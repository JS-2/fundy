import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  withStyles, 
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid, Paper, Box } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Qna from "../../components/fundingDetail/FundingQna";
import Board from "../../components/fundingDetail/FundingBoard"
import FundingTerms from "../../components/fundingDetail/FundingTerms";
import FundingInfo from "../../components/fundingDetail/FundingInfo";



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

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
  }));
  
  export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index: number) => {
      setValue(index);
    };
  
    return (
      <div  >

        <div className="fundingHeader" style={{backgroundColor:"#dddddd"}}>
            <h3 className="fundingTitle"style={{textAlign:"center"}}>이번달의 소녀 1집 데뷔 앨범 공식 펀딩</h3>

            <div className="row">
                <div className="col-md-8" style={{position:"relative", top:"130px"}} >
                <img width="100%" src="https://d1o7cxaf8di5ts.cloudfront.net/file/project/singer_hotissue_01/info/hotissue_01_thumb_v2.png"></img>
                </div>
                <div className="col-md-4" style={{position:"relative", top:"130px", paddingRight:"30px"}}>
                <h5>이번달의 소녀를 공식 후원하고 1집 데뷔앨범을 선착순으로 수령해보세요</h5>
                
                <table style={{width:"100%"}} >
              <tr>
                <td><h6>302,230,230원</h6></td>
                <td style={{textAlign:"right"}}><h6>70%</h6></td>
                  </tr>
            </table>
            <BorderLinearProgress variant="determinate" value={70} />
          
            <a id="logoAnchor" href="1234/payment">
                <Button variant="contained" color="primary">
                  펀딩하기
                </Button>
              </a>

            </div>
            </div>
        </div>
        <AppBar position="static" color="default" style={{marginTop:"200px"}}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="펀딩 스토리" {...a11yProps(0)} />
            <Tab label="공지사항" {...a11yProps(1)} />
            <Tab label="문의하기" {...a11yProps(2)} />
            <Tab label="펀딩 약관" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >

          <TabPanel value={value} index={0} dir={theme.direction}>
            <FundingInfo></FundingInfo>
          
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="boardComp">
            <Board></Board>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Qna/>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <FundingTerms></FundingTerms>
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <FundingTerms></FundingTerms>
          </TabPanel>
        </SwipeableViews>
      </div>
    );
  }