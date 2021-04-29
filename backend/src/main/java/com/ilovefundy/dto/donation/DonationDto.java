package com.ilovefundy.dto.donation;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class DonationDto {
    @Id
    @GeneratedValue
    private int donation_id;

    private String donation_name;
    private String donation_address;
    private long donation_total_amount; // 총기부금액
    private String account_number; // 기부처 계좌번호
}
