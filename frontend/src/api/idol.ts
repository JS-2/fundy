import axiosInstance from "./axiosConfig"

export const getIdolList = (page: number) => {
    const per_page = 4;
    
    return axiosInstance
        .get('/idols', {
            params: {
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