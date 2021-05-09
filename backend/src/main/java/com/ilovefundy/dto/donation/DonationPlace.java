package com.ilovefundy.dto.donation;

import lombok.*;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "donation_place")
@AllArgsConstructor
@NoArgsConstructor
public class DonationPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donation_place_id")
    private Integer donationPlaceId;

    @BatchSize(size = 10)
    @OneToMany(mappedBy = "donationPlace")
    private List<Donation> donations = new ArrayList<>();

    @Column(name = "place_name")
    private String placeName;
    @Column(name = "place_address")
    private String placeAddress;
    @Column(name = "place_total_amount")
    private long placeTotalAmount; // 총기부금액
    @Column(name = "account_number")
    private String accountNumber; // 기부처 계좌번호
}
