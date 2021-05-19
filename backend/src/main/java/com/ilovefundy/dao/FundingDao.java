package com.ilovefundy.dao;


import com.ilovefundy.dto.funding.IFundingListResponse;
import com.ilovefundy.entity.funding.FundingProject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FundingDao extends JpaRepository<FundingProject, Integer> {
    // 펀딩 상세보기
//    List<FundingProject> findByFundingId(int id);
    FundingProject findByFundingId(int id);

    // 펀딩 승인 여부 별 리스트
    Page<FundingProject> findByIsConfirm(FundingProject.FundingConfirm isStatus, Pageable pageable);

    // 펀딩 제목으로 검색
    Page<FundingProject> findByFundingNameContains(String title, Pageable pageable);

    // 승인여부 별 & 펀딩 제목으록 검색
    Page<FundingProject> findByFundingNameContainsAndIsConfirm(String title, FundingProject.FundingConfirm IsStatus, Pageable pageable);

    // 승인 - 진행 전
    Page<FundingProject> findByFundingStartTimeAfterAndIsConfirm(LocalDateTime time, FundingProject.FundingConfirm IsStatus, Pageable pageable);
    Page<FundingProject> findByFundingStartTimeAfterAndIsConfirmAndFundingNameContains(LocalDateTime time, FundingProject.FundingConfirm IsStatus, String keyword, Pageable pageable);

    // 승인 - 진행 중
    Page<FundingProject> findByFundingStartTimeBeforeAndFundingEndTimeAfterAndIsConfirm(LocalDateTime time, LocalDateTime time2, FundingProject.FundingConfirm IsStatus, Pageable pageable);
    FundingProject findByFundingStartTimeBeforeAndFundingEndTimeAfterAndIsConfirm(LocalDateTime time, LocalDateTime time2, FundingProject.FundingConfirm IsStatus);
    Page<FundingProject> findByFundingStartTimeBeforeAndFundingEndTimeAfterAndIsConfirmAndFundingNameContains(LocalDateTime time, LocalDateTime time2, FundingProject.FundingConfirm IsStatus, String keyword, Pageable pageable);

    // 승인 - 마감
    Page<FundingProject> findByFundingEndTimeBeforeAndIsConfirm(LocalDateTime time, FundingProject.FundingConfirm IsStatus, Pageable pageable);
    Page<FundingProject> findByFundingEndTimeBeforeAndIsConfirmAndFundingNameContains(LocalDateTime time, FundingProject.FundingConfirm IsStatus, String keyword, Pageable pageable);

    // 펀딩 완료(성공)
    @Query(value = "SELECT f.*\n" +
            "FROM funding_project f join (SELECT funding_id, sum(pay_amount) as total_amount\n" +
            "                            FROM pay_info\n" +
            "                            GROUP BY funding_id) p\n" +
            "                            ON f.funding_id = p.funding_id\n" +
            "WHERE f.funding_end_time < now() and\n" +
            "       (f.is_confirm = 1 or f.is_confirm = 3) and\n" +
            "       f.funding_goal_amount <= p.total_amount",
            countQuery = "SELECT count(*) FROM funding_project f join (SELECT funding_id, sum(pay_amount) as total_amount\n" +
                    "FROM pay_info\n" +
                    "GROUP BY funding_id) p\n" +
                    "ON f.funding_id = p.funding_id\n" +
                    "WHERE f.funding_end_time < now() and\n" +
                    "(f.is_confirm = 1 or f.is_confirm = 3) and\n" +
                    "f.funding_goal_amount <= p.total_amount",
            nativeQuery = true)
    Page<FundingProject> CompleteSuccessFunding(Pageable pageable);
    @Query(value = "SELECT f.*\n" +
            "FROM funding_project f join (SELECT funding_id, sum(pay_amount) as total_amount\n" +
            "                            FROM pay_info\n" +
            "                            GROUP BY funding_id) p\n" +
            "                            ON f.funding_id = p.funding_id\n" +
            "WHERE f.funding_end_time < now() and\n" +
            "       (f.is_confirm = 1 or f.is_confirm = 3) and\n" +
            "       f.funding_goal_amount <= p.total_amount and" +
            "       f.funding_name like CONCAT('%', :keyword, '%')",
            countQuery = "SELECT count(*) FROM funding_project f join (SELECT funding_id, sum(pay_amount) as total_amount\n" +
                    "FROM pay_info\n" +
                    "GROUP BY funding_id) p\n" +
                    "ON f.funding_id = p.funding_id\n" +
                    "WHERE f.funding_end_time < now() and\n" +
                    "(f.is_confirm = 1 or f.is_confirm = 3) and\n" +
                    "f.funding_goal_amount <= p.total_amount and \n" +
                    "f.funding_name like CONCAT('%', :keyword, '%')",
            nativeQuery = true)
    Page<FundingProject> CompleteSuccessFundingWithKeyword(String keyword, Pageable pageable);

    // 펀딩 완료(실패)
    @Query(value = "SELECT f.*\n" +
            "FROM funding_project f join (SELECT funding_id, sum(pay_amount) as total_amount\n" +
            "                            FROM pay_info\n" +
            "                            GROUP BY funding_id) p\n" +
            "                            ON f.funding_id = p.funding_id\n" +
            "WHERE f.funding_end_time < now() and\n" +
            "       (f.is_confirm = 1 or f.is_confirm = 4) and\n" +
            "       f.funding_goal_amount > p.total_amount",
            countQuery = "SELECT count(*) FROM funding_project f join (SELECT funding_id, sum(pay_amount) as total_amount\n" +
                    "FROM pay_info\n" +
                    "GROUP BY funding_id) p\n" +
                    "ON f.funding_id = p.funding_id\n" +
                    "WHERE f.funding_end_time < now() and\n" +
                    "(f.is_confirm = 1 or f.is_confirm = 4) and\n" +
                    "f.funding_goal_amount > p.total_amount",
            nativeQuery = true)
    Page<FundingProject> CompleteFailFunding(Pageable pageable);
    @Query(value = "SELECT f.*\n" +
            "FROM funding_project f join (SELECT funding_id, sum(pay_amount) as total_amount\n" +
            "                            FROM pay_info\n" +
            "                            GROUP BY funding_id) p\n" +
            "                            ON f.funding_id = p.funding_id\n" +
            "WHERE f.funding_end_time < now() and\n" +
            "       (f.is_confirm = 1 or f.is_confirm = 4) and\n" +
            "       f.funding_goal_amount > p.total_amount and" +
            "       f.funding_name like CONCAT('%', :keyword, '%')",
            countQuery = "SELECT count(*) FROM funding_project f join (SELECT funding_id, sum(pay_amount) as total_amount\n" +
                    "FROM pay_info\n" +
                    "GROUP BY funding_id) p\n" +
                    "ON f.funding_id = p.funding_id\n" +
                    "WHERE f.funding_end_time < now() and\n" +
                    "(f.is_confirm = 1 or f.is_confirm = 4) and\n" +
                    "f.funding_goal_amount > p.total_amount and \n" +
                    "f.funding_name like CONCAT('%', :keyword, '%')",
            nativeQuery = true)
    Page<FundingProject> CompleteFailFundingWithKeyword(String keyword, Pageable pageable);

    // 아이돌 기부 상세보기
    List<FundingProject> findByIdolIdAndDonationPlaceId(int idol_id, int donation_place_id);

    // 아이돌 or 그룹이 진행한 펀딩
    List<FundingProject> findByIdolId(int idol_id);

    // 사용자 관심 펀딩
    List<FundingProject> findByUserId(int user_id);

    // 아이돌 or 그룹이 진행한 펀딩 마감 시간 내림차순
    List<FundingProject> findByIdolIdOrderByFundingEndTimeDesc(int idol_id);
}