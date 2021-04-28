package com.ilovefundy.dto.funding;

import java.time.LocalDateTime;

public class FundingDto {
    private int funding_id;
    private int donation_id;
    private int idol_id;
    private int user_id;

    private FundingType funding_type; // 펀딩 타입
    private String funding_name;
    private String idol_name;
    private int funding_goal_amount;
    private LocalDateTime funding_start_time; // 펀딩 시작 시간
    private LocalDateTime funding_end_time; // 펀딩 종료 시간
    private String funding_content;
    private String funding_thumbnail;
    private boolean is_donate; // 기부 옵션 선택 여부
    private FundingConfirm is_confirm; // 펀딩 승인 여부
    private YesOrNo is_good_funding; // 굿프로젝트 여부

    private enum FundingType{
        Donation, Basic;
    }
    private enum FundingConfirm {
        Wait, Approve, Decline;
    }
    private enum YesOrNo {
        Y, N;
    }
}
