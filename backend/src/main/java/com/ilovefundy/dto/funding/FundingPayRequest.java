package com.ilovefundy.dto.funding;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class FundingPayRequest {
    @ApiModelProperty(example = "결제 금액")
    @NotNull
    private Long payAmount;
    @ApiModelProperty(example = "아임포트 uid")
    @NotNull
    private String impUid;
}
