package com.ilovefundy.dto.pay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class PayInfo {
    @Id
    @GeneratedValue
    @Column(name = "payment_id")
    private Integer paymentId;

    @Column(name = "user_id")
    private Integer userId;
    @Column(name = "funding_id")
    private Integer fundingId;
    @Column(name = "pay_amount")
    private long payAmount; // 펀딩 결제 금액
}
