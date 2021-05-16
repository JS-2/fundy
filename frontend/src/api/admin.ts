import axiosInstance from "./axiosConfig";

export const getFanCertPosts = (auth_token: string) => {
    return axiosInstance
        .get('/admin/fan-auth',{
        params: {
            page: 1,
            per_page: 100,
        }, headers: {
            Authorization: auth_token
        }}
        );
}

export const getProfilePosts = (auth_token: string) => {
    console.log(auth_token);
    return axiosInstance
        .get('/admin/profile-auth',{
        params: {
            page: 1,
            per_page: 100,
        }, headers: {
            Authorization: auth_token
        }}
        );
}

export const postFanCert = (fanHistory: string, auth_token: string) => {
    console.log(fanHistory);
    return axiosInstance.post('/grade/fan-auth', { fanHistory }, {
        headers: {
            Authorization: auth_token
        }
    })
}

export const postProfileCert = (age: number, name: string, profileHistory: string, profilePicture: any, auth_token: string) => {
    const frm = new FormData();
    frm.append('age', String(age));
    frm.append('name', name);
    frm.append('profileHistory', profileHistory);
    frm.append('profilePicture', profilePicture);

    return axiosInstance.post('/grade/profile-auth', frm, {
        headers: {
            Authorization: auth_token
        }
    })
}

export const acceptFanCert = (user_id: number, auth_token: string) => {
    return axiosInstance.patch('/admin/fan-auth/' + user_id + '/accept', {}, {
        headers: {
            Authorization: auth_token
        }
    })
}

export const declineFanCert = (user_id: number, auth_token: string) => {
    return axiosInstance.patch('/admin/fan-auth/' + user_id + '/decline', {}, {
        headers: {
            Authorization: auth_token
        }
    })
}

export const acceptProfileCert = (user_id: number, auth_token: string) => {
    return axiosInstance.patch('/admin/profile-auth/' + user_id + '/accept', {}, {
        headers: {
            Authorization: auth_token
        }
    })
}

export const declineProfileCert = (user_id: number, auth_token: string) => {
    return axiosInstance.patch('/admin/profile-auth/' + user_id + '/decline', {}, {
        headers: {
            Authorization: auth_token
        }
    })
}