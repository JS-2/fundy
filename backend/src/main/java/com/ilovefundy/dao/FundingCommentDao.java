package com.ilovefundy.dao;

import com.ilovefundy.dto.funding.FundingComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FundingCommentDao extends JpaRepository<FundingComment, Integer> {
    FundingComment findByFundingCommentId(int id);

}
