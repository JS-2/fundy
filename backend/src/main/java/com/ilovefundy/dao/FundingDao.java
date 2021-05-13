package com.ilovefundy.dao;


import com.ilovefundy.entity.funding.FundingProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundingDao extends JpaRepository<FundingProject, Integer> {
    //펀딩 상세보기
//    List<FundingProject> findByFundingId(int id);
    FundingProject findByFundingId(int id);

    // 아이돌 기부 상세보기
    List<FundingProject> findByIdolIdAndDonationPlaceId(int idol_id, int donation_place_id);

    // 아이돌 or 그룹이 진행한 펀딩
    List<FundingProject> findByIdolId(int idol_id);

    // 사용자 관심 펀딩
    List<FundingProject> findByUserId(int user_id);

    // 아이돌 or 그룹이 진행한 펀딩 마감 시간 내림차순
    List<FundingProject> findByIdolIdOrderByFundingEndTimeDesc(int idol_id);
}