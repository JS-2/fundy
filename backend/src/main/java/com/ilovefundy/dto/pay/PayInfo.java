package com.ilovefundy.dto.pay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private int paymentId;

    private int userId;
    private int fundingId;
    private long payAmount; // 펀딩 결제 금액
}
