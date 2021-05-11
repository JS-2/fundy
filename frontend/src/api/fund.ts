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