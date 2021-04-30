package com.ilovefundy.dto.donation;

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
public class Donation {
    @Id
    @GeneratedValue
    @Column(name = "donation_id")
    private Integer donationId;

    @Column(name = "donation_name")
    private String donationName;
    @Column(name = "donation_address")
    private String donationAddress;
    @Column(name = "donation_total_amount")
    private long donationTotalAmount; // 총기부금액
    @Column(name = "account_number")
    private String accountNumber; // 기부처 계좌번호
}
