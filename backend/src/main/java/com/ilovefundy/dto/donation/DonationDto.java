package com.ilovefundy.dto.donation;

import lombok.Data;

@Data
public class DonationDto {
    private int donation_id;
    private String donation_name;
    private String donation_address;
    private long donation_total_amount; // 총기부금액
    private String account_number; // 기부처 계좌번호
}
