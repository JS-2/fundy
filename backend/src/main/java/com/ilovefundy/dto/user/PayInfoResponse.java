package com.ilovefundy.dto.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class PayInfoResponse {
    @ApiModelProperty(example = "4")
    private Integer fundingId;
    @ApiModelProperty(example = "'MORE & MORE 앨범 후원'")
    private String fundingName;
    @ApiModelProperty(example = "'[MORE & MORE 앨범]을 메이크스타에서 구입하고 한정판 포토카드와 영상통화 기회를 놓치지 마세요!'")
    private String fundingSubtitle;
    @ApiModelProperty(example = "펀딩 등록자 닉네임 : 재성")
    private String userNickname;
    @ApiModelProperty(example = "펀딩 등록자 레벨 : A+")
    private String userLevel;
    @ApiModelProperty(example = "진행중")
    private String fundingStatement;
    @ApiModelProperty(example = "2")
    private Integer paymentId;
    @ApiModelProperty(example = "250,000")
    private String payAmount;
    @ApiModelProperty(example = "2021-05-06 09:30:15")
    private LocalDateTime payDatetime;
    @ApiModelProperty(example = "2021-05-17 06:36:35")
    private LocalDateTime fundingEndTime;
}
