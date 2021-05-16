package com.ilovefundy.dto.funding;

import java.time.LocalDateTime;

public interface IFundingListResponse {
    Integer getFundingId();
    String getFundingName();
    String getFundingSubtitle();
    String getFundingThumbnail();
    LocalDateTime getFundingStartTime();
    LocalDateTime getFundingEndTime();
}
