package com.ilovefundy.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.type.NumericBooleanType;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "user_password")
    private String userPassword;
    @Column(name = "user_nickname")
    private String userNickname;
    @Column(name = "user_address")
    private String userAddress;
    @Column(name = "user_picture")
    private String userPicture;
    @Column(name = "funding_regist_count")
    private Integer fundingRegistCount; // 펀딩 개설 개수

    @Enumerated(EnumType.STRING)
    @Column(name = "is_admin")
    private YesOrNo isAdmin; // 관리자 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_adult")
    private YesOrNo isAdult; // 성인인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_official_fan")
    private YesOrNo isOfficialFan; // 팬활동 인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "is_profile")
    private YesOrNo isProfile; // 프로필 인증 여부
    @Enumerated(EnumType.STRING)
    @Column(name = "user_level")
    private Level userLevel; // 인증레벨
    @Column(name = "enabled")
    private NumericBooleanType enabled; //활성화 여부

    private enum YesOrNo {
        Y, N;
    }

    private enum Level { // 플러스 표시는 문자더블로 표기
        A, B, C, D, AA, BB, CC;
    }
}