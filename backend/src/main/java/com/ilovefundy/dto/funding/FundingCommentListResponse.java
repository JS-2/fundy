package com.ilovefundy.dto.funding;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class FundingCommentListResponse {
    @ApiModelProperty(example = "1")
    private Integer fundingCommentId;
    @ApiModelProperty(example = "\"댓글 내용입니다.\"")
    private String fundingCommentContent;
    @ApiModelProperty(example = "2021-05-13 17:59:59")
    private LocalDateTime fundingCommentTime;
    @ApiModelProperty(example = "")
    private String userPicture;
    @ApiModelProperty(example = "멍멍이")
    private String userNickname;
}
