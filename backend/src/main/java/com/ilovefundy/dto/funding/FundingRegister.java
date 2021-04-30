package com.ilovefundy.dto.funding;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "funding_register")
@AllArgsConstructor
@NoArgsConstructor
public class FundingRegister {
    @Id
    @GeneratedValue
    @Column(name = "funding_register_id")
    private Integer fundingRegisterId;

    @Column(name = "user_id")
    private Integer userId;

    //프로필 인증
    @Column(name = "funding_regter_name")
    private String fundingRegisterName;
    @Column(name = "funding_register_picture")
    private String fundingRegisterPicture;
    @Column(name = "funding_register_age")
    private Integer fundingRegisterAge;

    @Column(name = "funding_register_history")
    private String fundingRegisterHistory; // 총대 경력
    @Column(name = "official_fan_history")
    private String officialFanHistory; // 팬활동 경력
}
