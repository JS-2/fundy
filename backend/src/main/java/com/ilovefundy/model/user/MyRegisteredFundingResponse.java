package com.ilovefundy.model.user;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.model.funding.FundingListResponse;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MyRegisteredFundingResponse extends FundingListResponse {
    @ApiModelProperty(example = "Approve")
    private FundingProject.FundingConfirm isConfirm;
}
