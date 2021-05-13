package com.ilovefundy.dao;

import com.ilovefundy.entity.funding.FundingComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FundingCommentDao extends JpaRepository<FundingComment, Integer> {
    //펀딩별 댓글 리스트
    Page<FundingComment> findByFunding_FundingId(int funding_id, Pageable pageable);

    FundingComment findByFundingCommentId(int id);

}
