package com.ilovefundy.entity.donation;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ilovefundy.entity.idol.Idol;
import lombok.*;

import javax.persistence.*;

@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="donationId")
@Entity
@Getter
@Setter
@Table(name = "donation")
@AllArgsConstructor
@NoArgsConstructor
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_id")
    private Integer donationId;

    @ManyToOne
    @JoinColumn(name = "idol_id")
    private Idol idol;

    @ManyToOne
    @JoinColumn(name = "donation_place_id")
    private DonationPlace donationPlace;

    @Column(name = "idol_donation_amount")
    private Long idolDonationAmount; //아이돌 기부금액
}
