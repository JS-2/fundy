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
            <h3 className="fundingTitle"style={{textAlign:"center"}}>이번달의 소녀</h3>

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
            <Button variant="contained" color="primary">펀딩하기</Button>
            <a id="logoAnchor" href="/payment">
                <Button variant="outlined" color="primary">
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
              <p style={{textAlign: "center"}}>동키즈 멤버와 당첨자가 정해진 시간동안 영상 통화를 진행합니다.</p>
<p style={{textAlign: "center"}}>&nbsp;</p>
<p style={{textAlign: "center"}}>&nbsp;</p>
<p style={{textAlign: "left"}}><span style={{backgroundColor: "#ff6600", color: "#ffffff"}}><strong>&nbsp;&lt;이벤트 진행일시&gt;&nbsp;</strong></span></p>
<h6 id="mcetoc_1euhoj48k0" style={{textAlign: "left"}}>👉 2021.05.09(일) 18:00</h6>
<p className="html-content-mce_p_small" style={{textAlign: "left"}}><span style={{color: "#808080"}}>*이벤트 일정은 아티스트 일정에 따라 변경될 수 있습니다.</span></p>
<p style={{textAlign: "left"}}>&nbsp;&nbsp;</p>
<p style={{textAlign: "left"}}><span style={{backgroundColor: "#ff6600", color: "#ffffff"}}><strong>&nbsp;&lt;이벤트 응모기간&gt;&nbsp;</strong></span></p>
<p style={{textAlign: "left"}}><strong>👉 2021.04.27(화) ~ 2021.05.03(월)</strong></p>
<p style={{textAlign: "left"}}>&nbsp;</p>
<p style={{textAlign: "left"}}><span style={{backgroundColor: "#ff6600", color: "#ffffff"}}><strong>&nbsp;&lt;응모방법&gt;&nbsp;</strong></span></p>
<p style={{textAlign: "left"}}>👉 응모 기간 내 본 프로젝트 페이지에서 <strong>DONGKIZ&nbsp;[Youniverse]를&nbsp;구매한 분 중</strong> 추첨을 통해<span style={{color: "#0000ff"}}><strong> 30명을 선정 </strong></span></p>
<p className="html-content-mce_p_small" style={{textAlign: "left"}}><span style={{backgroundColor: "#ffff99", color: "#808080"}}>* 응모 가능 횟수는 주문건수와는 무관하며 본 프로젝트 안에서 앨범을 구매하신 총 수량만큼 응모하실 수 있습니다.</span><br /><span style={{color: "#808080"}}>* 결제 완료 처리가 된 주문건에 한해서 EVENT에 응모하실 수 있습니다.</span><br /><span style={{color: "#0000ff"}}><strong>* <span style={{color: "#000000"}}>본 이벤트는 주문 시 기입해주시는 <span style={{backgroundColor: "#ffff99"}}>이벤트 응모 정보(응모자 성함/응모자 전화번호/ 응모자 메신저&amp;ID)</span>를 토대로 응모가 진행됩니다.</span></strong></span><br />* 앨범 기명은 구매하실 때 입력하신 스타메이커명 기준이며&nbsp;한/영(한글 10자 이내, 영어 20자 이내)에 한하여 가능합니다. 스타메이커명이 적합하지 않은 것으로 판단되는 경우 변경 요청드릴 수 있습니다.</p>
<p>&nbsp;</p>
<p><span style={{backgroundColor: "#ff6600", color: "#ffffff"}}><strong>&nbsp;&lt;당첨자 발표&gt;&nbsp;</strong></span></p>
<p><strong>👉 2021.05.04(화), 12:00 이후 메이크스타 프로젝트 페이지 및 당첨자 개별 안내</strong></p>
<p>&nbsp;</p>
<p><span style={{backgroundColor: "#ff6600", color: "#ffffff"}}><strong>&nbsp;&lt;추첨 인원&gt;&nbsp;</strong></span></p>
<p><strong>👉30명</strong></p>
<p>&nbsp;</p>
<hr />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Board></Board>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Qna/>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </div>
    );
  }