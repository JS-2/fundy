package com.ilovefundy.dto.funding;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class FundingPayRequest {
    @NotNull
    Integer payAmount;
    @NotNull
    LocalDateTime payTime;
}
