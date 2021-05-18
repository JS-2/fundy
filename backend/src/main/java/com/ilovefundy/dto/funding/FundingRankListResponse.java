package com.ilovefundy.dto.funding;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class FundingRankListResponse {
    @ApiModelProperty(example = "1")
    private Integer fundingId;
    @ApiModelProperty(example = "\"MORE & MORE 앨범 후원\"")
    private String fundingName;
    @ApiModelProperty(example = "35")
    private Integer fundingAchievementRate;
    @ApiModelProperty(example = "240")
    private Integer fundingParticipants;
}
