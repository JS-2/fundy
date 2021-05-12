package com.ilovefundy.dao;

import com.ilovefundy.dto.donation.DonationPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationPlaceDao extends JpaRepository<DonationPlace, Integer> {
    DonationPlace findByDonationPlaceId(int donation_place_id);
}
