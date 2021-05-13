package com.ilovefundy.dto.funding;

import com.ilovefundy.entity.user.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class FundingNoticeListResponse {
    @ApiModelProperty(example = "1")
    private Integer fundingNoticeId;
    @ApiModelProperty(example = "\"공지사항 제목입니다.\"")
    private String fundingNoticeTitle;
    @ApiModelProperty(example = "\"공지사항 내용입니다.\"")
    private String fundingNoticeContent;
    @ApiModelProperty(example = "2021-05-13 17:59:59")
    private LocalDateTime fundingNoticeTime;
    @ApiModelProperty(example = "")
    private String userPicture;
    @ApiModelProperty(example = "멍멍이")
    private String userNickname;
}
