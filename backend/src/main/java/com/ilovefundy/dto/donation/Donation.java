package com.ilovefundy.dto.donation;

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
public class Donation {
    @Id
    @GeneratedValue
    private int donationId;

    private String donationName;
    private String donationAddress;
    private long donationTotalAmount; // 총기부금액
    private String accountnumber; // 기부처 계좌번호
}
