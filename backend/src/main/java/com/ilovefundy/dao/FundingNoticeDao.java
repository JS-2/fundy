package com.ilovefundy.dao;

import com.ilovefundy.dto.funding.FundingProject;
import com.ilovefundy.dto.funding.FundingNotice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface FundingNoticeDao extends JpaRepository<FundingNotice, Integer> {
    //펀딩 공지사항 리스트(펀딩 별 공지사항)
//    Set<FundingNotice> findAllByFundingId(int funding_id, PageRequest pageable);
    Page<FundingNotice> findAllByFundingId(int funding_id, Pageable pageable);

    //펀딩 공지사항 상세보기
    FundingNotice findByFundingNoticeId(int id);
}