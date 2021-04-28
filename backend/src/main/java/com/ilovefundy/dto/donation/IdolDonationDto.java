package com.ilovefundy.dto.donation;

import lombok.Data;

@Data
public class IdolDonationDto {
    private int idol_id;
    private int donation_id;
    private long idol_donation_amount; //아이돌 기부금액
}
