package com.ilovefundy.dto.funding;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Funding {
    @Id
    @GeneratedValue
    private int fundingId;

    private int donationId;
    private int idolId;
    private int userId;

    private FundingType fundingType; // 펀딩 타입
    private String fundingName;
    private String idolName;
    private int fundingGoalAmount;
    private LocalDateTime fundingStartTime; // 펀딩 시작 시간
    private LocalDateTime fundingEndTime; // 펀딩 종료 시간
    private String fundingContent;
    private String fundingThumbnail;
    private boolean isDonate; // 기부 옵션 선택 여부
    private FundingConfirm isConfirm; // 펀딩 승인 여부
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
