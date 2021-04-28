package com.ilovefundy.dto.user;

import lombok.Data;

@Data
public class UserDto {
    private int user_id;
    private String user_email;
    private String user_password;
    private String user_nickname;
    private String user_address;
    private String user_picture;
    private int funding_regist_count; // 펀딩 개설 개수

    private YesOrNo is_admin; // 관리자 여부
    private YesOrNo is_adult; // 성인인증 여부
    private YesOrNo is_official_fan; // 팬활동 인증 여부
    private YesOrNo is_profile; // 프로필 인증 여부
    private Level user_level; // 인증레벨

    private enum YesOrNo {
        Y, N;
    }

    private enum Level { // ?플러스는?
        A, B, C, D, AA, BB, CC;
    }
}