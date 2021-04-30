package com.ilovefundy.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.type.NumericBooleanType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    private Integer userId;

    private String userEmail;
    private String userPassword;
    private String userNickname;
    private String userAddress;
    private String userPicture;
    private Integer fundingRegistCount; // 펀딩 개설 개수

    private YesOrNo isAdmin; // 관리자 여부
    private YesOrNo isAdult; // 성인인증 여부
    private YesOrNo isOfficialFan; // 팬활동 인증 여부
    private YesOrNo isProfile; // 프로필 인증 여부
    private Level userLevel; // 인증레벨
    private NumericBooleanType enabled; //활성화 여부

    private enum YesOrNo {
        Y, N;
    }

    private enum Level { // 플러스 표시는 문자더블로 표기
        A, B, C, D, AA, BB, CC;
    }
}