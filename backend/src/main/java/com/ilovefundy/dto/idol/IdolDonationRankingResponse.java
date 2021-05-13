package com.ilovefundy.dto.idol;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class IdolDonationRankingResponse {
    @ApiModelProperty(example = "1")
    private Integer idolId;
    @ApiModelProperty(example = "\"트와이스\"")
    private String idolName;
    @ApiModelProperty(example = "\"1,500,000\"")
    private String donationAmount;

    public IdolDonationRankingResponse(int idolId, String donationAmount) {
        this.idolId = idolId;
        this.donationAmount = donationAmount;
    }
}
