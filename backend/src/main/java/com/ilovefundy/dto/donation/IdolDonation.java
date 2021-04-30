package com.ilovefundy.dto.donation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class IdolDonation {
    private int idolId;
    private int donationId;
    private long idolDonationAmount; //아이돌 기부금액
}
