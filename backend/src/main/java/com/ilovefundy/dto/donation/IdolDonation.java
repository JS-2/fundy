package com.ilovefundy.dto.donation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class IdolDonation {
    @Column(name = "idol_id")
    private Integer idolId;
    @Column(name = "donation_id")
    private Integer donationId;
    @Column(name = "idol_donation_amount")
    private long idolDonationAmount; //아이돌 기부금액
}
