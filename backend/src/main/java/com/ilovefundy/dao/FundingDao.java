package com.ilovefundy.dao;


import com.ilovefundy.dto.funding.FundingProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundingDao extends JpaRepository<FundingProject, Integer> {
    //펀딩 상세보기
    FundingProject findByFundingId(int id);


}