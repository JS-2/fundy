package com.ilovefundy.dto.funding;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class FundingUserListResponse {
    @ApiModelProperty(example = "1")
    private Integer userId;
    @ApiModelProperty(example = "\"김우식\"")
    private String userNickname;
    @ApiModelProperty(example = "\"1,000,000\"")
    private String payAmount;
    @ApiModelProperty(example = "2021-05-12 12:30:05")
    private LocalDateTime payDatetime;
}
