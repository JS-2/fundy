package com.ilovefundy.dto.funding;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ilovefundy.dto.pay.PayInfo;
import com.ilovefundy.dto.user.User;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="fundingId")
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class FundingProject {
    @Id
    @GeneratedValue
    @Column(name = "funding_id")
    private Integer fundingId;

    @BatchSize(size=10)
//    @JsonBackReference
    @JsonIgnore
    @ManyToMany(mappedBy = "fundings")
    private Set<User> users = new LinkedHashSet<>();

    @BatchSize(size=10)
//    @JsonBackReference
//    @JsonIgnore
    @OneToMany(mappedBy = "funding")
    private List<PayInfo> userPays = new ArrayList<>();

    @Column(name = "donation_id")
    private Integer donationId;
    @Column(name = "idol_id")
    private Integer idolId;
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "funding_type")
    @ColumnDefault("1")
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
    @ColumnDefault("0")
    private boolean isDonate; // 기부 옵션 선택 여부
    @Column(name = "is_Confirm")
    @ColumnDefault("0")
    private FundingConfirm isConfirm; // 펀딩 승인 여부
    @Column(name = "is_good_funding")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'N'")
    private YesOrNo isGoodFunding; // 굿프로젝트 여부

    public enum FundingType{
        Donation, Basic;
    }
    public enum FundingConfirm {
        Wait, Approve, Decline;
    }
    public enum YesOrNo {
        Y, N;
    }
}
