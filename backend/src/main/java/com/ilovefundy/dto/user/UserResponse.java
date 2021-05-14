package com.ilovefundy.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserResponse {
    @ApiModelProperty(example = "1")
    private Integer userId;
    @ApiModelProperty(example = "msmf3@naver.com")
    private String userEmail;
    @ApiModelProperty(example = "우식")
    private String userNickname;
    @ApiModelProperty(example = "강북구 미아동")
    private String userAddress;
    @ApiModelProperty(example = "./img/~~이미지경로")
    private String userPicture;
    @ApiModelProperty(example = "D")
    private String userLevel; // 인증레벨
    @ApiModelProperty(example = "Y")
    private String isAdult; // 성인 여부
    @ApiModelProperty(example = "Y")
    private String isPlus;  // 플러스 인증
    @ApiModelProperty(example = "N | Waiting | Approve | Decline")
    private String isOfficialFan;   // 팬활동 인증
    @ApiModelProperty(example = "N | Waiting | Approve | Decline")
    private String isProfile;   // 프로필 인증
    @ApiModelProperty(example = "ADMIN")
    private String role;    // 권한레벨
}
