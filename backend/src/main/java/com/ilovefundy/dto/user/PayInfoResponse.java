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
    @ApiModelProperty(example = "\"https://ww.namu.la/s/58143f816267c648f2e3ddaff8a39fc73fa2aff08b5fbf4abcadf53e62c880c5e95d36bf8dccc46b63218f9810d51bfa1a0a3bc1ffbf084fc98b245747fd8337a9c83694a8f0ae80bbc717091b8a8c6c4a15d4d1a868a34af2ef3a1c05ec883d9cc7cdeb9c4941ab6cec8607d7ac6818\"")
    private String fundingThumbnail;
    @ApiModelProperty(example = "2")
    private Integer paymentId;
    @ApiModelProperty(example = "5")
    private Integer fundingRemainDay;
    @ApiModelProperty(example = "250,000")
    private String payAmount;
    @ApiModelProperty(example = "2021-05-06 09:30:15")
    private LocalDateTime payDatetime;
    @ApiModelProperty(example = "2021-05-17 06:36:35")
    private LocalDateTime fundingEndTime;
    @ApiModelProperty(example = "100,000")
    private String fundingAmount;
    @ApiModelProperty(example = "35")
    private Integer fundingAchievementRate;
    @ApiModelProperty(example = "240")
    private Integer fundingParticipants;
}
