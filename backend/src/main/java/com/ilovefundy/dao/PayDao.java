package com.ilovefundy.dao;

import com.ilovefundy.entity.funding.FundingProject;
import com.ilovefundy.entity.pay.PayInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PayDao extends JpaRepository<PayInfo, Integer> {
    // 펀딩별 결제리스트
    List<PayInfo> findByFundingAndPayAmountIsGreaterThan(FundingProject funding_id, long funding_amount);
}
