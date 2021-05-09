package com.ilovefundy.dao;


import com.ilovefundy.dto.funding.FundingProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundingDao extends JpaRepository<FundingProject, Integer> {
    //펀딩 상세보기
    FundingProject findByFundingId(int id);

    // 아이돌 기부 상세보기
    List<FundingProject> findByIdolIdAndDonationPlaceId(int idol_id, int donation_place_id);

}