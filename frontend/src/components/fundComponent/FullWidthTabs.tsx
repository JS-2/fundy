import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FundingTerms from '../fundingDetail/FundingTerms';
import Qna from '../fundingDetail/Qna';
import Board from "../../components/fundingDetail/FundingBoard"
import FundingInfo from "../../components/fundingDetail/FundingInfo";

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
    backgroundColor: "white",
    width: "100%",
  },
}));

const FullWidthTabs = (props:any) => {
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
    <div className={classes.root}>
     <AppBar position="static" color="default" style={{marginTop:"0px"}}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="funding tabs"
            style={{height:'70px', backgroundColor:'white'}}
   
          >
            <Tab style={{fontSize:"18px", marginTop:'10px'}} label="?????? ?????????" {...a11yProps(0)} />
            <Tab style={{fontSize:"18px", marginTop:'10px'}} label="????????????" {...a11yProps(1)} />
            <Tab style={{fontSize:"18px", marginTop:'10px'}} label="????????????" {...a11yProps(2)} />
            <Tab style={{fontSize:"18px", marginTop:'10px'}} label="?????? ??????" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className="col-md-12"
        >

          <TabPanel value={value} index={0} dir={theme.direction}>
            <FundingInfo width="100%" detail={props.detail}></FundingInfo>
          
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="boardComp">
            <Board notices={props.notices}></Board>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Qna/>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <FundingTerms></FundingTerms>
          </TabPanel>
        
        </SwipeableViews>
    </div>
  );
}



export default FullWidthTabs;
