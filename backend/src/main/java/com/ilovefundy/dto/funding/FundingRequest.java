package com.ilovefundy.dto.funding;

import com.ilovefundy.entity.funding.FundingProject;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class FundingRequest {
    @NotNull
    FundingProject.FundingType fundingType;
//    @NotNull
//    Integer userId;
    @NotNull
    String fundingName;
    @NotNull
    String fundingSubtitle;
    @NotNull
    Integer idolId;
//    @NotNull
//    String idolName;
    @NotNull
    Integer goalAmount;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    LocalDateTime startTime;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    LocalDateTime endTime;
    @NotNull
    String fundingContent;

    MultipartFile Thumbnail;
    @NotNull
    Integer donationRate;

    Integer donationPlaceId;
}
