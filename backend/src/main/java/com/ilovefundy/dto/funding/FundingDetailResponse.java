package com.ilovefundy.dto.funding;

import com.ilovefundy.entity.funding.FundingProject;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class FundingDetailResponse {
    @ApiModelProperty(example = "1")
    private Integer fundingId;
    @ApiModelProperty(example = "2")
    private Integer idolId;
    @ApiModelProperty(example = "1")
    private Integer userId;
    @ApiModelProperty(example = "멍멍이")
    private String userNickname;
    @ApiModelProperty(example = "\"MORE & MORE 앨범 후원\"")
    private String fundingName;
    @ApiModelProperty(example = "\"트와이스\"")
    private String idolName;
    @ApiModelProperty(example = "\"9개월 만에 컴백이자 2020년 발표하는 첫 신곡 \"MORE & MORE\"에 후원하세요!\"")
    private String fundingSubtitle;
    @ApiModelProperty(example = "1")
    private Integer donationPlaceId;
    @ApiModelProperty(example = "\"[MORE & MORE 앨범]을 메이크스타에서 구입하고 한정판 포토카드와 영상통화 기회를 놓치지 마세요!\"")
    private String fundingContent;
    @ApiModelProperty(example = "2021-05-08T06:36:35")
    private LocalDateTime fundingStartTime;
    @ApiModelProperty(example = "2021-05-08T06:36:35")
    private LocalDateTime fundingEndTime;
    @ApiModelProperty(example = "1,000,000")
    private String fundingGoalAmount;
    @ApiModelProperty(example = "\"https://w.namu.la/s/5703200f638848a16bf998adbd8a6337a08bda86b08f70819792ba65b9d2ed98be58491328215f24783bdb0dbfc18853bf500f243c9c7f75e963963dd23f3c582d0e1e6760c61449b3d8a7c5f1ab11ad1d38eb6f1ee15a3c12c707168422c297ebcaa07fc5f803fc66c71aadfc5b8b68\"")
    private String fundingThumbnail;
    @ApiModelProperty(example = "Basic")
    private FundingProject.FundingType fundingType;
    @ApiModelProperty(example = "5")
    private Integer donationRate;
    @ApiModelProperty(example = "Wait")
    private FundingProject.FundingConfirm fundingConfirm;
    @ApiModelProperty(example = "N")
    private FundingProject.YesOrNo isGoodFunding;

    @ApiModelProperty(example = "5")
    private Integer fundingRemainDay;
    @ApiModelProperty(example = "100,000")
    private String fundingAmount;
    @ApiModelProperty(example = "35")
    private Integer fundingAchievementRate;
    @ApiModelProperty(example = "1000")
    private Integer fundingParticipants;
}
