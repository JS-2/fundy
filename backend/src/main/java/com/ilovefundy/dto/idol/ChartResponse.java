package com.ilovefundy.dto.idol;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ChartResponse {
    // 날짜
    private String x;
    // 기부 금액
    private String y;

    public ChartResponse(String x, String y) {
        this.x = x;
        this.y = y;
    }
}
