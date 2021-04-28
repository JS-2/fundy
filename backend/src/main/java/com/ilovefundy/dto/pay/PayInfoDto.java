package com.ilovefundy.dto.pay;

import lombok.Data;

@Data
public class PayInfoDto {
    private int payment_id;
    private int user_id;
    private int funding_id;
    private long pay_amount; // 펀딩 결제 금액
}
