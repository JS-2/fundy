package com.ilovefundy.model.user;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.model.funding.FundingListResponse;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
public class MyRegisteredFundingResponse extends FundingListResponse {
    @ApiModelProperty(example = "Approve")
    private FundingProject.FundingConfirm isConfirm;
}
