package com.ilovefundy.dao;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.funding.FundingNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundingNoticeDao extends JpaRepository<FundingNotice, Integer> {
    //펀딩 공지사항 상세보기
    FundingNotice findByFundingNoticeId(int id);
}