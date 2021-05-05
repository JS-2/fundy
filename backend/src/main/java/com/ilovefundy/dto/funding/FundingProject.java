package com.ilovefundy.dto.funding;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class FundingProject {
    @Id
    @GeneratedValue
    @Column(name = "funding_id")
    private Integer fundingId;

    @Column(name = "donation_id")
    private Integer donationId;
    @Column(name = "idol_id")
    private Integer idolId;
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "funding_type")
    private FundingType fundingType; // 펀딩 타입
    @Column(name = "funding_name")
    private String fundingName;
    @Column(name = "idol_name")
    private String idolName;
    @Column(name = "funding_goal_amount")
    private Integer fundingGoalAmount;
    @Column(name = "funding_start_time")
    private LocalDateTime fundingStartTime; // 펀딩 시작 시간
    @Column(name = "funding_end_time")
    private LocalDateTime fundingEndTime; // 펀딩 종료 시간
    @Column(name = "funding_content")
    private String fundingContent;
    @Column(name = "funding_thumbnail")
    private String fundingThumbnail;
    @Column(name = "is_Donate")
    private boolean isDonate; // 기부 옵션 선택 여부
    @Column(name = "is_Confirm")
    private FundingConfirm isConfirm; // 펀딩 승인 여부
    @Column(name = "is_good_funding")
    @Enumerated(EnumType.STRING)
    private YesOrNo isGoodFunding; // 굿프로젝트 여부

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
