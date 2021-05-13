package com.ilovefundy.dao;

import com.ilovefundy.dto.funding.FundingNotice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FundingNoticeDao extends JpaRepository<FundingNotice, Integer> {
    //펀딩 공지사항 리스트(펀딩 별 공지사항)
//    Set<FundingNotice> findAllByFundingId(int funding_id, PageRequest pageable);
    Page<FundingNotice> findAllByFunding_FundingId(int funding_id, Pageable pageable);

    //펀딩 공지사항 상세보기
    FundingNotice findByFundingNoticeId(int id);
}