package com.ilovefundy.dao;

import com.ilovefundy.dto.idol.ChartResponse;
import com.ilovefundy.dto.idol.IChartResponse;
import com.ilovefundy.entity.donation.Donation;
import com.ilovefundy.dto.idol.IIdolDonation;
import com.ilovefundy.dto.idol.IIdolDonationRanking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface DonationDao extends JpaRepository<Donation, Integer> {
    @Query(value = "SELECT d.idol_id as idolId, format(sum(d.idol_donation_amount),0) as donationAmount \n" +
            "FROM donation d\n" +
            "GROUP BY d.idol_id\n" +
            "ORDER BY sum(d.idol_donation_amount) desc \n" +
            "LIMIT 5;", nativeQuery = true)
    List<IIdolDonationRanking> getTop5IdolDonationRanking();

    @Query(value = "SELECT d.donation_place_id as donationPlaceId, d.idol_id as idolId, format(sum(d.idol_donation_amount),0) as donationAmount \n" +
            "FROM donation d\n" +
            "WHERE d.idol_id = ?1\n" +
            "GROUP BY d.donation_place_id", nativeQuery = true)
    List<IIdolDonation> getIdolDonationList(int idol_id);

    @Query(value = "SELECT date_format(donation_date, '%Y-%m') as x, idol_donation_amount as y\n" +
            "FROM donation\n" +
            "WHERE idol_id = ?1 and date_format(donation_date, '%Y-%m') = ?2", nativeQuery = true)
    List<IChartResponse> getDonationMonthly(int idol_id, String ym);
}
