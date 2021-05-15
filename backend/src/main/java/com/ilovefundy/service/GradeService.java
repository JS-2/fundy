package com.ilovefundy.service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.AccessToken;
import com.siot.IamportRestClient.response.Certification;
import com.siot.IamportRestClient.response.IamportResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class GradeService {
    private final IamportClient client;
    @Value("${import.restApi.key}")
    private String api_key;
    @Value("${import.restApi.secret}")
    private String api_secret_key;

    public GradeService() {
        client = new IamportClient(api_key, api_secret_key);
    }

    public boolean isAdult(String imp_uid) throws IOException, IamportResponseException {
        // 아임포트 토큰 발급
        IamportResponse<AccessToken> getToken = client.getAuth();
        String access_token = getToken.getResponse().getToken();

        // imp_uid 로 인증 조회
        IamportResponse<Certification> getCertInfo = client.certificationByImpUid(imp_uid);
        Date birth = getCertInfo.getResponse().getBirth();
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(birth);
        int year = calendar.get(Calendar.YEAR);

        // 성인 인증
        if(year <= 2001) {
            return true;
        }
        return false;
    }

}
