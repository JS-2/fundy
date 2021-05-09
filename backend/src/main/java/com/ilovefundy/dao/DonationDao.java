package com.ilovefundy.dao;

import com.ilovefundy.dto.donation.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationDao extends JpaRepository<Donation, Integer> {

}
