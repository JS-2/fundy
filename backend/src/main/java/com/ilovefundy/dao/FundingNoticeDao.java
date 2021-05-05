package com.ilovefundy.dao;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.funding.FundingNotice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FundingNoticeDao extends JpaRepository<FundingNotice, Integer> {
    //펀딩 공지사항 상세보기
    FundingProject findByFundingNoticeId(int id);
}