package com.ilovefundy.dto.funding;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class FundingRegisterDto {
    @Id
    @GeneratedValue
    private int funding_register_id;

    private int user_id;

    //프로필 인증
    private String funding_register_name;
    private String funding_register_picture;
    private int funding_register_age;

    private String funding_register_history; // 총대 경력
    private String official_fan_history; // 팬활동 경력
}
