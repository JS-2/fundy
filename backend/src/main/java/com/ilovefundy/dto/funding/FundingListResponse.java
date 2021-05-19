package com.ilovefundy.dto.funding;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class FundingListResponse {
    @ApiModelProperty(example = "1")
    private Integer fundingId;
    @ApiModelProperty(example = "\"MORE & MORE 앨범 후원\"")
    private String fundingName;
    @ApiModelProperty(example = "\"9개월 만에 컴백이자 2020년 발표하는 첫 신곡 \"MORE & MORE\"에 후원하세요!\"")
    private String fundingSubtitle;
    @ApiModelProperty(example = "\"https://ww.namu.la/s/58143f816267c648f2e3ddaff8a39fc73fa2aff08b5fbf4abcadf53e62c880c5e95d36bf8dccc46b63218f9810d51bfa1a0a3bc1ffbf084fc98b245747fd8337a9c83694a8f0ae80bbc717091b8a8c6c4a15d4d1a868a34af2ef3a1c05ec883d9cc7cdeb9c4941ab6cec8607d7ac6818\"")
    private String fundingThumbnail;
    @ApiModelProperty(example = "5")
    private Integer fundingRemainDay;
    @ApiModelProperty(example = "100,000")
    private String fundingAmount;
    @ApiModelProperty(example = "35")
    private Integer fundingAchievementRate;
    @ApiModelProperty(example = "2021-05-12 17:22:20")
    private LocalDateTime fundingStartTime;
    @ApiModelProperty(example = "2021-05-22 17:22:20")
    private LocalDateTime fundingEndTime;
    @ApiModelProperty(example = "240")
    private Integer fundingParticipants;
}
