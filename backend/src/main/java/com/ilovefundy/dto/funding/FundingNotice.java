package com.ilovefundy.dto.funding;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class FundingNotice {
    @Id
    @GeneratedValue
    @Column(name = "funding_notice_id")
    private Integer fundingNoticeId;

    @Column(name = "funding_id")
    private Integer fundingId;
    @Column(name = "funding_notice_name")
    private String fundingNoticeName;
    @Column(name = "funding_notice_register_nickname")
    private String fundingNoticeRegisterNickname;
    @Column(name = "register_picture")
    private String registerPicture;
    @Column(name = "funding_notice_content")
    private String fundingNoticeContent;
    @Column(name = "funding_notice_reg_time")
    private LocalDateTime fundingNoticeRegTime; // 공지사항 작성시간
}
