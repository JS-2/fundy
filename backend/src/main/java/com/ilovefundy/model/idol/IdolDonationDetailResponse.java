package com.ilovefundy.model.idol;

import com.ilovefundy.dto.user.User;
import com.ilovefundy.model.funding.FundingUserListResponse;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
public class IdolDonationDetailResponse {
    @ApiModelProperty(example = "1")
    private Integer fundingId;
    @ApiModelProperty(example = "\"YES or YES 앨범 후원\"")
    private String fundingName;
    private List<FundingUserListResponse> users;
}
