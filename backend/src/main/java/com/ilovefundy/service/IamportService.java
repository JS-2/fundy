package com.ilovefundy.service;

import com.siot.IamportRestClient.IamportClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class IamportService {
    private IamportClient client;
    @Value("${iamport.restApi.key}")
    private String api_key;
    @Value("${iamport.restApi.secret}")
    private String api_secret_key;

    @PostConstruct
    public void IamportServiceInit() {
        client = new IamportClient(api_key, api_secret_key);
    }

    public IamportClient getClient() {
        return this.client;
    }
}
