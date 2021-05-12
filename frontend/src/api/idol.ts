import axiosInstance from "./axiosConfig"

export const getIdolList = (keyword: string | null = null, page: number) => {
    const per_page = 4;
    
    return axiosInstance
        .get('/idols', {
            params: {
                keyword,
                page,
                per_page,
            }
        });
}

export const getIdolMember = (keyword: string) => {
    return axiosInstance
        .get('/idols', {
            params: {
                keyword,
                page: 1,
                per_page: 100,
            }
        });
}

export const getIdolInfo = (idol_id: number) => {
    return axiosInstance
        .get('/idols/' + idol_id);
}

export const getIdolRanking = () => {
    return axiosInstance
        .get('/donation/idol/ranking');
}

export const getIdolDonationData = (idol_id: string) => {
    return axiosInstance
        .get('/donation/' + idol_id);
}