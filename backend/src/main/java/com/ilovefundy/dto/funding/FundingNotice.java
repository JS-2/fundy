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
public class FundingNotice {
    @Id
    @GeneratedValue
    private int fundingNoticeId;

    private int fundingId;
    private String fundingNoticeName;
    private String fundingNoiceRegisterNickname;
    private String registerPicture;
    private String fundingNoticeContent;
    private LocalDateTime fundingNoticeRegTime; // 공지사항 작성시간
}
