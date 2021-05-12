package com.ilovefundy.dto.funding;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.ManyToAny;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "funding_notice")
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
public class FundingNotice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "funding_notice_id")
    private Integer fundingNoticeId;

    @ManyToOne
    @JoinColumn(name = "funding_id")
    private FundingProject fundingId;
    @Column(name = "funding_notice_name")
    private String fundingNoticeName;
    @Column(name = "funding_notice_register_nickname")
    private String fundingNoticeRegisterNickname;
    @Column(name = "register_picture")
    private String registerPicture;
    @Column(name = "funding_notice_content", columnDefinition = "LONGTEXT")
    private String fundingNoticeContent;

    @CreatedDate
    @Column(name = "funding_notice_reg_time")
    private LocalDateTime fundingNoticeRegTime; // 공지사항 작성시간
}
