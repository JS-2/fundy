package com.ilovefundy.dto.pay;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class PayInfoDto {
    @Id
    @GeneratedValue
    private int payment_id;

    private int user_id;
    private int funding_id;
    private long pay_amount; // 펀딩 결제 금액
}
