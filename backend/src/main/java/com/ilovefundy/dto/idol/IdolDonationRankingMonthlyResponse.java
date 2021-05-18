package com.ilovefundy.dto.idol;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class IdolDonationRankingMonthlyResponse {
    @ApiModelProperty(value = "1")
    private Integer idol_id;
    @ApiModelProperty(value = "트와이스")
    private String id;
    @ApiModelProperty(value = "data : [{x : '2020.01', y : 10000}]")
    private List<ChartResponse> data;
}
