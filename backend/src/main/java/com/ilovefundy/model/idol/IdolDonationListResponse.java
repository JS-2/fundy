package com.ilovefundy.model.idol;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class IdolDonationListResponse {
    @ApiModelProperty(example = "1")
    private Integer donationPlaceId;
    @ApiModelProperty(example = "\"하트하트재단\"")
    private String placeName;
    @ApiModelProperty(example = "\"서울 송파구 송이로23길 34\"")
    private String placeAddress;
    @ApiModelProperty(example = "\"5,000,000\"")
    private String idolDonationPlaceAmount;
}
