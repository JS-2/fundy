package com.ilovefundy.dto.funding;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class FundingRegister {
    @Id
    @GeneratedValue
    private int fundingRegisterId;

    private int userId;

    //프로필 인증
    private String fundingRegisterName;
    private String fundingRegisterPicture;
    private int fundingRegisterAge;

    private String fundingRegisterHistory; // 총대 경력
    private String officialFanHistory; // 팬활동 경력
}
