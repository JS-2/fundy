import { FundForm, FundingForm } from "../common/types";
import axiosInstance from "./axiosConfig"




export const getFundDetail = (funding_id: number) => {
    
    return axiosInstance
        .get('/fundings/'+funding_id);
}


export const setFundCreate = (fund: FundingForm, auth_token: string) => {
    const frm = new FormData();
    frm.append('donationPlaceId', String(fund.donationPlaceId));
    frm.append('donationRate', String(fund.donationRate));
    frm.append('endTime', fund.endTime!.toISOString());
    frm.append('fundingContent', fund.fundingContent);
    frm.append('fundingName', fund.fundingName);
    frm.append('fundingSubtitle', fund.fundingSubtitle);
    frm.append('fundingType', fund.fundingType);
    frm.append('goalAmount', String(fund.goalAmount));
    frm.append('idolId', String(fund.idolId));
    frm.append('startTime', fund.startTime!.toISOString());
    frm.append('thumbnail', fund.thumbnail);
    return axiosInstance
        .post('/fundings', frm, {
            headers: {
                Authorization: auth_token,
            },
        }
        );
   
}



export const getFundNotice = (funding_id: number) => {
    
    return axiosInstance
        .get('/fundings/'+funding_id+'/notices',{
        params: {
            page: 1,
            per_page: 100,
        }}
        );
}
