package com.ilovefundy.model.funding;

import com.ilovefundy.dto.funding.FundingProject;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@NoArgsConstructor
@Valid
@Data
public class FundingRequest {
    @NotNull
    FundingProject.FundingType fundingType;
    @NotNull
    String fundingName;
    @NotNull
    String idolName;
    @NotNull
    Integer goalAmount;
    @NotNull
    LocalDateTime startTime;
    @NotNull
    LocalDateTime endTime;
    @NotNull
    String fundingContent;

    String Thumbnail;
    @NotNull
    Boolean isDonate;
    @NotNull
    FundingProject.FundingConfirm isConfirm;
    @NotNull
    FundingProject.YesOrNo isGoodFunding;
}
