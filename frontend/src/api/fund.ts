import { FundForm, FundingForm } from "../common/types";
import axiosInstance from "./axiosConfig"


export const getFundList = (page: number) => {
    const per_page = 4;
    
    return axiosInstance
        .get('/fundings', {
            params: {
                page,
                per_page,
            }
        });
}

export const getFundDetail = (funding_id: number) => {
    
    return axiosInstance
        .get('/fundings/'+funding_id);
}


export const setFundCreate = (fund: FundingForm, auth_token: string) => {
    
    return axiosInstance
        .post('/fundings',JSON.stringify(fund), {
            headers: {
                Authorization: auth_token,
                "Content-Type": `application/json`,
              },
        }
        ).then((res) => {
            console.log(res);
          });
   
}